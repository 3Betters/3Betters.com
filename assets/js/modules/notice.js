//###############################################
// Notice Messaging System
//###############################################
notice = {
    //===============================================
    // Adds a new notice
    // msg:     (STR) The message to display
    // code:    (STR) The message code (for removal)
    // type:    (STR) ['error'] The class of the notice wrapper to appear in (without the dot).
    // callback:(STR) [removeNotice] the callback to execute on click
    // icon:    (STR) [delete] The data-icon to use
    //===============================================
    add: function(msg, code, type, callback, icon){
        //- - - - - - - - - - - - - - - - - - - - - - - -
        // Setup defaults
        //- - - - - - - - - - - - - - - - - - - - - - - -
        type = type || 'error';
        var $notices = $m('ul.notices.' + type);
        if(msg.indexOf('<a ') === -1) msg = '<a>'+msg+'</a>';
        callback = callback || function(){removeNotice($(this));};
        icon = icon || 'delete';

        //- - - - - - - - - - - - - - - - - - - - - - - -
        // Creae the row
        //- - - - - - - - - - - - - - - - - - - - - - - -
        if($('li[data-notice="' + code + '"]', $notices).length) return;
        $notices.append('<li data-notice="'+code+'" data-theme="c" data-icon="'+icon+'">'+msg+'</li>').listview('refresh');
        $notices.children('li').last().unbind('click').click(function(){
            callback();
        });
        $notices.show();
    },

    //===============================================
    // Removes a notice by the code ID
    // code:    (STR/ARR) Either the code string-ID or list of ID's
    //===============================================
    remove: function(code){
        if(_.isString(code)) code = [code];
        var $notices = $m('ul.notices');

        _.each(code, function(errCode){
            $('li[data-notice="' + errCode + '"]', $notices).remove();
            $notices.each(function(){
                var $this = $(this);
                if($('li', $this).length < 2) $this.hide();
            });
        });
    }
};

//===============================================
// Default callback for removing a notice
//===============================================
function removeNotice($this){
    $this.closest('li').remove();
    var $notices = $('ul.notices');
    $notices.each(function(){
        var $this = $(this);
        if($('li', $this).length < 2) $this.hide();
    });
}