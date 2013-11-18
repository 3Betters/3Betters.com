//###############################################
// Bankroll Manger
//###############################################
bankroll = function(){
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

    return {
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
        },

        //###############################################
        // Overview Page
        //###############################################
        overview: {
            //===============================================
            // Quickstart Session
            //===============================================
            // $this:       [OBJ] The element being clicked
            // 
            quickstart: function($this){
                //===============================================
                // Toggle the timer
                //===============================================
                //:: Starting will autofill the start time
                //:: Stopping will autofill the end time
                //:: Continueing will create a new session with the same fields
                //:: Clicking "New Session" will clear out all the fields
                //
                $this.toggleClass('started');
                var now = moment();

                //===============================================
                // Start new session
                //===============================================
                if($this.hasClass('started')){
                    switchTheme($this, 'b');
                    $this.find('.ui-btn-text').text('Stop');

                    $m('[name=start]').val(now.format('YYYY-MM-DD, HH:mm:ss'));
                //===============================================
                // Stop current Session
                //===============================================
                // Update the time
                // 
                } else {
                    switchTheme($this, 'c');
                    $this.find('.ui-btn-text').text('Continue');
                    var diff = now.diff(
                        moment(
                            $m('[name=start]').val(),
                            'YYYY-MM-DD, HH:mm:ss'
                        )
                    );
                    var time = milliToTime(diff);
                    console.log(time);

                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    // Calculate the time
                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    $m('[name=end]').val(now.format('YYYY-MM-DD, HH:mm:ss'));
                    $m('[name=total]').val(time.hours + ':' + time.minutes + ':' + time.seconds);
                }
            }
        }
    };
}();