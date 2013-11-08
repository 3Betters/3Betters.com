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
        eval($(this).attr('click'));
    });
};