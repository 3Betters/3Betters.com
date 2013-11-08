//###############################################
// Click API
// :: Add [click="func"] to any element you want to track
// :: "func" represents the function/method to call
//###############################################


//===============================================
// Watch click events
//===============================================
api.watch.click = function(){
    $('[click]').unbind('click').click(function(e){
        var $this = $(this);
        run($this.attr('click'), {
            $this:  $this,
            e:      e
        });
    });
};

//===============================================
// Core methods
//===============================================
api['click'] = {
    //===============================================
    // Login
    //===============================================
    login: function(){
        user.isIn(true);
    },

    //===============================================
    // Logout
    //===============================================
    logout: function(){
        window.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + window.location.href;
    }
};