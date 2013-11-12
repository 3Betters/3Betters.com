//###############################################
// Authentication Module
//###############################################
auth = function(){
    var clientID = '324420386814-09gqv0bpav4svkilv7i8kk9tmm5sakla.apps.googleusercontent.com';
    var scopes = ['https://www.googleapis.com/auth/drive.file', 'https://spreadsheets.google.com/feeds/'];
    var callbacks = {
        pass: null,
        fail: null
    };
    var isIn = false;   //Is the user logged in?
    var authToken = null;   //The access token

    //===============================================
    // Gets the server response for authorization
    //===============================================
    function response(result){
        if(result && !result.error){
            loggedIn();
            if(callbacks.pass) callbacks.pass(result);
            app.log('Logged in', result);
        }
        else {
            loggedOut();
            if(callbacks.pass) callbacks.pass(result);
            app.log('Could not log in.', result);
        }
    }

    //===============================================
    // Updates site to reflect being logged in
    //===============================================
    function loggedIn(){
        var $login = $('.login');
        switchTheme($login, 'b');
        $('.ui-btn-text', $login).text($login.data('text-logout'));
        $login.attr('onclick', 'window.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + window.location.href;');

        isIn = true;

        //- - - - - - - - - - - - - - - - - - - - - - - -
        // Load Database
        //- - - - - - - - - - - - - - - - - - - - - - - -
        authToken = gapi.auth.getToken().access_token;
        db.load();
    }

    //===============================================
    // Updates site to reflect being logged in
    //===============================================
    function loggedOut(){
        var $login = $('.login');
        switchTheme($login, 'c');
        $('.ui-btn-text', $login).text($login.data('text-login'));
        $login.attr('onclick', 'auth.login(true)');

        isIn = false;
        authToken = null;
    }

    //###############################################
    // API
    //###############################################
    return {
        //===============================================
        // Attempts to log the user in
        //===============================================
        login: function(popup, pass, fail){
            callbacks.pass = pass;
            callbacks.fail = fail;

            //- - - - - - - - - - - - - - - - - - - - - - - -
            // Already logged in
            //- - - - - - - - - - - - - - - - - - - - - - - -
            if(isIn){
                pass = true;
                if(pass) pass();
                loggedIn();
            //- - - - - - - - - - - - - - - - - - - - - - - -
            // Attempt Login
            //- - - - - - - - - - - - - - - - - - - - - - - -
            } else {
                gapi.auth.authorize({
                    client_id:  clientID,
                    scope:      scopes,
                    immediate:  !popup
                }, response);
            }
        },

        //===============================================
        // Checks if the user is in
        //===============================================
        in: function(pass, fail){
            if(isIn && pass) pass();
            if(!isIn && fail) fail();
            return isIn;
        },

        //===============================================
        // Gets the authentication token
        //===============================================
        token: function(){
            return authToken;
        }
    };
}();