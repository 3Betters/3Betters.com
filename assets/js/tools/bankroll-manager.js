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
            // Quickstart
            //===============================================
            // $this:       [OBJ] The element being clicked
            // 
            quickstart: function($this){
                $this.toggleClass('started');
                if($this.hasClass('started')){
                    switchTheme($this, 'b');
                    $this.find('.ui-btn-text').text('Stop');
                } else {
                    switchTheme($this, 'c');
                    $this.find('.ui-btn-text').text('Continue');
                }
            }
        }
    };
}();