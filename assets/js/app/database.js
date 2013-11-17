//###############################################
// The database interface
// :: Also contains meta data for modules
//###############################################
db = function(){
    //===============================================
    // Private Callbacks
    //===============================================
    var callbacks = {
        //===============================================
        // Callback after loading
        //===============================================
        load: function(result, callback){
            if(_.isFunction(callback)) callback(result);
            else{
                if(!result.items.length){
                    db.create();
                    app.log('Creating database', result);
                }
                else {
                    db.meta(result.items[0]);
                    db.sheets.load(db.sheets.check);
                    app.log('Loaded databases', result);
                }
            }
        }
    };
    var meta = {};      //Contains the database meta data, which is what gets returned from db.load
    var sheetMeta = {}; //Contains global sheets metadata
    var feedURL = '';
    var checked = false;

    return {
        //===============================================
        // Load the database
        // :: Look for database files
        //      :: If not found, then create one
        // :: Load modules sheet
        //===============================================
        load: function(callback){
            loading('Finding Database');
            gapi.client.request({
                path:       'drive/v2/files',
                method:     'GET',
                params:     {
                    q:      'trashed = false',
                },
                callback:   function(result){
                    loading();
                    callbacks.load(result, callback);
                }
            });
        },

        //===============================================
        // Determines if we have checked the database yet
        //===============================================
        checked: function(){return checked;},

        //===============================================
        // Gets the databases URL
        //===============================================
        url: function(){
            return feedURL + auth.token();
        },

        //===============================================
        // Creates a new database
        //===============================================
        create: function(callback){
            loading('Creating Database');
            gapi.client.request({
                path:       'drive/v2/files',
                method:     'POST',
                body:       {
                    'title':    '[3Betters] Database',
                    'mimeType': 'application/vnd.google-apps.spreadsheet'
                },
                callback: function(result){
                    loading();
                    db.meta(result);
                    db.sheets.load(db.sheets.check);
                    app.log('Created database', result);

                    if(_.isFunction(callback)) callback(result);
                }
            });
        },

        //===============================================
        // Gets or Reads the database meta data
        //===============================================
        meta: function(db){
            if(!db) return meta;
            else meta = db;
        },




        //###############################################
        // Individual sheets
        //###############################################
        sheets: {
            //===============================================
            // Loads all the sheet meta from the current database
            // :: This will overwrite any existing data
            // :: Converts the feed into a json object
            //===============================================
            load: function(callback){
                feedURL = 'https://spreadsheets.google.com/feeds/worksheets/' + db.meta().id + '/private/full?access_token=';
                loading('Loading Sheets');
                $.get(db.url())
                    .fail(function(){
                        notice.add('Could not load sheets, try refreshing the page if you just deleted your database or went offline.', 'no sheets');
                        loading();
                    }).done(function(data){
                        loading();
                        var $feed = $('feed', data);

                        //- - - - - - - - - - - - - - - - - - - - - - - -
                        // Parse the meta
                        //- - - - - - - - - - - - - - - - - - - - - - - -
                        sheetMeta = {
                            id:         $feed.children('id').text(),
                            updated:    $feed.children('updated').text(),
                            sheet:     []
                        };
                        //- - - - - - - - - - - - - - - - - - - - - - - -
                        // Parse sheets
                        //- - - - - - - - - - - - - - - - - - - - - - - -
                        $feed.children('entry').each(function(){
                            var $this = $(this);
                            sheetMeta.sheet.push({
                                url:    $this.children('id').text(),
                                title:  $this.children('title').text()
                            });
                        });

                        app.log('Loaded sheets', sheetMeta);
                        if(_.isFunction(callback)) callback();
                    });
            },

            //===============================================
            // Checks that the required sheets are there
            // :: Builds them if they aren't
            //      :: Fill in defaults
            // :: Validate that required data is set
            //      :: Fill in defaults if they aren't
            //===============================================
            check: function(){
                var required = ['Mods', 'Bankroll Manager'];
                var existing = _.pluck(sheetMeta.sheet, 'title');
                var missing = _.difference(required, existing);
                var loaded = [];

                //- - - - - - - - - - - - - - - - - - - - - - - -
                // Create the sheet
                //- - - - - - - - - - - - - - - - - - - - - - - -
                _.each(missing, function(e, i){
                    loading('Creating required sheets');
                    var action = e.toLowerCase();

                    $.post('/server/post.php', {
                            url:    db.url(),
                            action:   'new-sheet',
                            data: {
                                title: e
                            }
                        }
                    ).error(function(result){
                        loading();
                        app.log(result);
                    }).done(function(result){
                        loading();
                        app.log('Created sheet -> ' + e, result);

                        //- - - - - - - - - - - - - - - - - - - - - - - -
                        // Initialize the page once everything is loaded
                        //- - - - - - - - - - - - - - - - - - - - - - - -
                        loaded.push(e);
                        var allLoaded = true;
                        _.each(missing, function(e){
                            if(_.indexOf(loaded, e) === -1)
                                allLoaded = false;
                        });
                        if(allLoaded){
                            checked = true;
                            page.init();
                        }
                    });
                });

                //- - - - - - - - - - - - - - - - - - - - - - - -
                // All have been loaded, init
                //- - - - - - - - - - - - - - - - - - - - - - - -
                if(missing.length === 0) {
                    checked = true;
                    page.init();
                }
            }
        }
    };
}();