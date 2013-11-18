//###############################################
// Bankroll Manger
//###############################################
bankroll = function(){
    var $start  = $m('[name=start]');
    var $end    = $m('[name=end]');
    var $total  = $m('[name=total]');
    var initialTime = 0;
    var totalTime = 0;

    //===============================================
    // Change the mental slider color
    //===============================================
    function updateMental(now){
        var $this = $(this);
        var theme = 'c';

        //- - - - - - - - - - - - - - - - - - - - - - - -
        // Update immediately (.pageShow)
        //- - - - - - - - - - - - - - - - - - - - - - - -
        if(now) $this = $('[name=mental]');

        if($this.val() == 1) theme = 'b';
        if($this.val() == 3) theme = 'd';

        switchTheme($this.next(), theme);
        switchTheme($this.next().find('div'), theme);
        switchTheme($this.next().find('a'), theme === 'c' ? 'a' : theme);
    }

    //===============================================
    // Update the total timer
    //===============================================
    // paused:  [BOOL] If true, the total time will be stored to be added when unpaused
    function updateTotalTime(storeTotal){
        var diff = moment().diff(initialTime) + totalTime;
        var time = milliToTime(diff);
        $total.val(time.hours + ':' + time.minutes + ':' + time.seconds);

        if(storeTotal) totalTime = diff;
    }




    //###############################################
    // Public Methods
    //###############################################
    return {
        //###############################################
        // Overview Page
        //###############################################
        overview: {
            //===============================================
            // Initialize the page
            //===============================================
            init: function(){
                $m('.bankroll-manager').show();
                $m('[name=mental]')
                    .unbind('change')
                    .change(updateMental)
                    .blur(updateMental);
                updateMental(true);

                $start  = $m('[name=start]');
                $end    = $m('[name=end]');
                $total  = $m('[name=total]');

                if($('.timer-toggle').hasClass('unpaused')){
                    updateTotalTime();
                    timers.clearPageShow.bankroll.paused = setInterval(function(){
                        updateTotalTime();
                    }, 1000);
                }
            },

            //===============================================
            // Quickstart Session
            //===============================================
            // $this:       [OBJ] The element being clicked
            // 
            quickstart: function($this){
                //===============================================
                // Toggle the timer
                //===============================================
                // Starting will autofill the start time
                // Stopping will autofill the end time
                // Continueing will create a new session with the same fields
                // Clicking "New Session" will clear out all the fields
                //
                $this.toggleClass('unpaused');

                //===============================================
                // Start new session
                //===============================================
                // 
                if($this.hasClass('unpaused')){
                    switchTheme($this, 'b');
                    $this.find('.ui-btn-text').text('Stop');
                    initialTime = new Date().getTime();

                    //===============================================
                    // Tick the timer
                    //===============================================
                    clearInterval(timers.clearPageShow.bankroll.paused);
                    timers.clearPageShow.bankroll.paused = setInterval(function(){
                        updateTotalTime();
                    }, 1000);

                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    // Either continue or start a new session
                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    if(!$this.hasClass('started')){
                        $this.addClass('started');
                        $start.val(moment().format('YYYY-MM-DD, HH:mm:ss'));
                        $total.val('0:00:00');
                    }
                //===============================================
                // Stop current Session
                //===============================================
                // Update the time
                // 
                } else {
                    switchTheme($this, 'c');
                    $this.find('.ui-btn-text').text('Continue');
                    clearInterval(timers.clearPageShow.bankroll.paused);
                    updateTotalTime(true);

                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    // Calculate the time
                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    $end.val(moment().format('YYYY-MM-DD, HH:mm:ss'));
                }
            }
        }
    };
}();