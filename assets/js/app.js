/*
            __________________        __    __                       
            \_____  \______   \ _____/  |__/  |_  ___________  ______
              _(__  <|    |  _// __ \   __\   __\/ __ \_  __ \/  ___/
             /       \    |   \  ___/|  |  |  | \  ___/|  | \/\___ \ 
            /______  /______  /\___  >__|  |__|  \___  >__|  /____  >
                   \/       \/     \/                \/           \/

                                    3Betters
                               Built by: Oz Ramos
                     a platform for the serious poker player

                            Main Application Script
                                    be +EV
*/

app = function(){
    //- - - - - - - - - - - - - - - - - - - - - - - -
    // List of loaded mods
    //- - - - - - - - - - - - - - - - - - - - - - - -
    var mods = {};
    var debug = !!$.url().param('debug');
    var url = $.url();

    $(function(){
        debug = $('body').hasClass('debug');
    });

    return {
        //===============================================
        // Toggle debugging
        //===============================================
        debug: function(setDebug){
            if(typeof setDebug == 'undefined') setDebug = debug;
            return debug = setDebug;
        },

        //===============================================
        // Console logging
        //===============================================
        // msg:     [STR] The message to log
        // data:    [***] Any additional data to display
        // 
        log: function(msg, data){
            if(app.debug()) console.log('3Betters: ' + msg, data);
        }
    };
}();

//###############################################
// The API interface
//###############################################
api = {};
$m = function($e){
    return $($e, $.mobile.activePage);
};

//###############################################
// PageShow events
//###############################################
$(document).bind('pagebeforeshow', function(){
    page.init();
    auth.visualize();
});

//###############################################
// GAPI
//###############################################
//===============================================
// Automaticly called after gapi-client.js is loaded
//===============================================
function gapiLoaded(){auth.login();}