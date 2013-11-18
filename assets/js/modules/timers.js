//###############################################
// Stores all the JS timers
//###############################################
// Structure: timers.type
// .type refers to the type of timer
// Each type contains one key for each timer
//
timers = {
    //===============================================
    // These are removed on each pageshow
    //===============================================
    clearPageShow: {
        bankroll: {},

        //===============================================
        // Clear all the clearPageShow timers
        //===============================================
        clear: function(){
            _.each(this, function(e,i){
                if(i !== 'clear'){
                    _.each(e, function(timer){
                        clearInterval(timer);
                    });
                }
            });
        }
    }
};