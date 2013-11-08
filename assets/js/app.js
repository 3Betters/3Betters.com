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
    var debug = false;
    $(function(){
        debug = !!$('body').attr('debug');
    });

    return {
        //===============================================
        // Loads a module
        // id:      [STR] The modules ID. Only get's loaded if it's unique
        // src:     [STR] URL of the file
        // callback:[FUNC] Callback function to execute after load
        //===============================================
        load: function(id, src){
            if(!_.has(mods, id)){
                //$.ajax
            }
        },

        //===============================================
        // Toggle debugging
        //===============================================
        debug: function(setDebug){
            return debug = setDebug;
        }
    };
}();

//###############################################
// The API interface
//###############################################
api = {};


//###############################################
// PageShow events
//###############################################
$(document).bind('pagebeforeshow', function(){
    //- - - - - - - - - - - - - - - - - - - - - - - -
    // Load Modules
    //- - - - - - - - - - - - - - - - - - - - - - - -
    $('script[data-module]').each(function(){
        var $this = $(this);
    });
});

//###############################################
// GAPI
//###############################################
//===============================================
// Automaticly called after gapi-client.js is loaded
//===============================================
function gapiLoaded(){auth.login();}