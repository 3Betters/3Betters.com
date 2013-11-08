/*
            __________________        __    __                       
            \_____  \______   \ _____/  |__/  |_  ___________  ______
              _(__  <|    |  _// __ \   __\   __\/ __ \_  __ \/  ___/
             /       \    |   \  ___/|  |  |  | \  ___/|  | \/\___ \ 
            /______  /______  /\___  >__|  |__|  \___  >__|  /____  >
                   \/       \/     \/                \/           \/

                                    3Betters
                               Built by: Oz Ramos
                  a rapid platform for the serious poker player

                            Main Application Script
                                    be +EV
*/

app = {
};

//###############################################
// The API interface
//###############################################
api = {
    //===============================================
    // Methods use to watch a $ event on each pageShow()
    //===============================================
    watch: {}
};


//###############################################
// PageShow events
//###############################################
$(document).bind('pagebeforeshow', function(){
    _.each(api.watch, function(func){
        func();
    });
});

//###############################################
// GAPI
//###############################################
//===============================================
// Automaticly called after gapi-client.js is loaded
//===============================================
function gapiLoaded(){
    auth.popup = false;
    window.setTimeout(auth.check, 1);
}