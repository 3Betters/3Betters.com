//###############################################
// Helpers
//###############################################
//===============================================
// GAPI callback
//===============================================
function handleClientLoad(){
    auth.popup = false;
    window.setTimeout(auth.check, 1);
}

//===============================================
// Changes the JQM theme for an element
// list:    (OBJ)   List of jQuery elements
// theme:   (STR)   The JQM theme letter to apply
// prefix:  (STR)   [ui-btn-up-] The prefix to apply
//===============================================
function switchTheme(list, theme, prefix){
    if(!_.isArray(list)) list = [list];
    prefix = prefix || 'ui-btn-up-';

    _.each(list, function($obj){
        $obj.removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-body-a ui-body-b ui-body-c')
            .addClass(prefix + theme)
            .attr('data-theme', theme);
    });
}

//===============================================
// Gets a deep child property by string
// obj:     (OBJ) The object to look through
// desc:    (STR) Dot notation to the property (ie, my.child.property)
// 
// returns: (***) The descendant property
//===============================================
function getProp(obj, desc) {
    var arr = desc.split(".");
    while(arr.length && (obj = obj[arr.shift()]));
    return obj;
}

//===============================================
// Loading Screen
// msg:    (STR) The message to display. Pass nothing to hide.
//===============================================
function loading(msg){
    if(_.isString(msg))
        $.mobile.loading('show', {
            text: msg,
            textVisible: true
        });
    else
        $.mobile.loading('hide');
}

//===============================================
// Execute a function or method
// func:    (STR) The function or method, by string
//===============================================
function run(func, args){
    if(typeof window[func] === 'function')
        window[func](args);
    else {
        (getProp(
            window[func.substr(0, func.indexOf('.'))],
            func.substr(func.indexOf('.') + 1)
        ))(args);
    }
}