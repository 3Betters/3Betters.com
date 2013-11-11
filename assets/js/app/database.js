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
                    db.sheets.load();
                    app.log('Loaded databases', result);
                }
            }
        }
    };
    var meta = {};      //Contains the database meta data, which is what gets returned from db.load
    var sheetMeta = {}; //Contains global sheets metadata

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
                    db.sheets.load();
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
            // Create a new worksheet if it doesn't exist
            //===============================================
            create: function(title){
                if(!_.isString(title))
                    return app.log('You must pass a [STR] title into sheets.create()');
            },

            //===============================================
            // Loads all the sheets from the current database
            // :: This will overwrite any existing data
            // :: Converts the feed into a json object
            //===============================================
            load: function(callback){
                var url = 'https://spreadsheets.google.com/feeds/worksheets/'+db.meta().id+'/private/full?access_token=' + auth.token();
                loading('Loading Sheets.');
                $.get(url, function(data){
                    loading();
                    app.log('Loaded sheets.', data);
                    var $feed = $('feed', data);

                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    // Parse the meta
                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    sheetMeta = {
                        orig:       data,
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
                }).fail(function(){
                    notice.add('Could not load sheets, try refreshing the page if you just deleted your database or went offline.', 'no sheets');
                    loading();
                });
            }
        }
    };
}();