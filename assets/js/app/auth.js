//###############################################
// Authentication Module
//###############################################
auth = {
    clientID:   '324420386814-7ti7k7b1kd23jf7a53jq6tpnu5n2k9ml.apps.googleusercontent.com',
    scopes:     'https://www.googleapis.com/auth/drive.file',

    //===============================================
    // Attempts to log the user in
    //===============================================
    check: function(popup){
        gapi.auth.authorize({
            client_id:  auth.clientID,
            scope:      auth.scopes,
            immediate:  !popup
        }, auth.response);
    },

    //===============================================
    // Gets the server response for authorization
    //===============================================
    response: function(result){
        if(result && !result.error)
            auth.loggedIn();
        else
            auth.loggedOut();
    },

    //===============================================
    // Updates site to reflect being logged in
    //===============================================
    loggedIn: function(){
        var $login = $('.login');
        switchTheme($login, 'b');
        $('.ui-btn-text', $login).text($login.data('text-logout'));
        $login.attr('click', 'api.click.logout');

        //- - - - - - - - - - - - - - - - - - - - - - - -
        // Check if the user has a databse
        //- - - - - - - - - - - - - - - - - - - - - - - -
        //if(!user.hasDatabase())
        //    user.createDatabase();
    },

    //===============================================
    // Updates site to reflect being logged in
    //===============================================
    loggedOut: function(){
        var $login = $('.login');
        switchTheme($login, 'c');
        $('.ui-btn-text', $login).text($login.data('text-login'));
        $login.attr('click', 'api.click.login');
    }
};