//###############################################
// Controls the page
//###############################################
page = function(){
    var loaded = [];    //Contains a list of loaded pages
    var loading = 0;    //Number of scripts being loaded (to prevent init from loading multiple times)
    var scriptsDir = '/assets/js/';

    return {
        //===============================================
        // Checks different page properties
        //===============================================
        check: {
            //===============================================
            // Check page requirements are met
            // :: Called after db.sheets.load()
            //===============================================
            requirements:   function(){
                if(!auth.checked()) return;

                //- - - - - - - - - - - - - - - - - - - - - - - -
                // Requires login
                //- - - - - - - - - - - - - - - - - - - - - - - -
                if($m('[meta-requires-login]').length && !auth.in())
                    notice.add('You must be logged in to use this page. Click to login.', 'requires-login', 'error', function(){auth.login(true);});
            }
        },
        //===============================================
        // Initializes the page
        //===============================================
        // :: Insures that scripts are only loaded once
        // :: Executes any init() scripts
        // 
        init: function(){
            if(!db.checked()) return;
            page.check.requirements();
            var script = $m('[meta-script]').attr('meta-script');
            var init = $m('[meta-init]').attr('meta-init');

            //- - - - - - - - - - - - - - - - - - - - - - - -
            // Loop through each script
            //- - - - - - - - - - - - - - - - - - - - - - - -
            // Once we've loaded the final script, execute the initializer
            // 
            if(script){
                var scripts = script.split(',');
                loading = scripts.length;
                _.each(scripts, function(script){
                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    // Load in scripts
                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    if(_.indexOf(loaded, script) === -1){
                        script = _.str.trim(script);
                        loaded.push(script);

                        $.getScript(scriptsDir + script, function(){
                            if(init && --loading === 0) eval(init);
                        });
                    } else if(init) eval(init);
                });
            } else {
                if(init) eval(init);
            }
        }
    };
}();