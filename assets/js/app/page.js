//###############################################
// Controls the page
//###############################################
page = function(){
    var loaded = [];    //Contains a list of loaded pages

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
            // Load in scripts
            //- - - - - - - - - - - - - - - - - - - - - - - -
            if(script && _.indexOf(loaded, script) === -1){
                loaded.push(script);
                $.getScript(script, function(){
                    if(init) eval(init);
                });
            } else if(init) eval(init);
        }
    };
}();