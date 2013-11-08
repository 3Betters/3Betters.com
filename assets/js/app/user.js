//###############################################
// Contains all the User Methods
//###############################################
user = {
    'in': false,        //Determines if the user is logged in
    data: {},           //Contains all the user data

    //===============================================
    // Checks if the user is logged in, and if not,
    // logs them in.
    // 
    // popup:       [BOOL] (false) Should we show a popup, or attempt auto-login?
    //
    // returns:     [BOOL] Is the user logged in?
    //===============================================
    isIn: function(popup){
        var hasDatabase = false;
        popup = popup || false;

        //- - - - - - - - - - - - - - - - - - - - - - - -
        // Log the user in
        //- - - - - - - - - - - - - - - - - - - - - - - -
        if(_.isEmpty(user.data)){
            auth.check(popup);
        }
    }
};