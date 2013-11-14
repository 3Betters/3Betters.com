//###############################################
// Controls the page
//###############################################
page = function(){
    return {
        //===============================================
        // Checks different page properties
        //===============================================
        check: {
            //===============================================
            // Check page requirements are met
            // :: Called after db.load()
            //===============================================
            requirements:   function(){
                if(!auth.checked()) return;

                //- - - - - - - - - - - - - - - - - - - - - - - -
                // Requires login
                //- - - - - - - - - - - - - - - - - - - - - - - -
                if($m('[meta-requires-login]').length && !auth.in())
                    notice.add('You must be logged in to use this page. Click to login.', 'requires-login', 'error', function(){auth.login(true);});
            },
            loaded:         function(){}
        }
    };
}();