# Helpers
The following is a list of some of the helper functions you can take advantage of:

## switchTheme
Changes the jQM theme of the element(s) passed in.

    // list:    (OBJ)   List of jQuery elements
    // theme:   (STR)   The JQM theme letter to apply
    // prefix:  (STR)   [ui-btn-up-] The prefix to apply
    switchTheme(list, theme, prefix);

## getProp
Gets a deep child property by string. This was created for `api.click` to allow you to run methods as well as functions.

    // obj:     (OBJ) The object to look through
    // desc:    (STR) Dot notation to the property (ie, my.child.property)
    // 
    // returns: (***) The descendant property
    getProp(obj, desc);

### Examples
    var test = {
        my: {
            method: function(){
                console.log('hello world!');
            }
        }
    };

#### Example 1
    var hi = getProp(test, 'my.method');
    hi();

    => 

    hello world!

#### Example 2
    <a href="#" click="test.my.method">Hi</a>

    =>

    Whenever a user clicks on "Hi", you'll see 'hello world!' in the console.

## loading
Shows the loading modal with the passed message, or hides it if nothing is passed.

    // msg:    (STR) The message to display. Pass nothing to hide.
    loading(msg);

## run
Executes the function or method by string. Passes an object of arguments

    // func:    (STR) The function or method, by string
    // args:    (OBJ) Contains all the properties to pass
    run(func, args);

### Examples
    run('myFunc');                  //Runs myFunc()
    run('my.method');               //Runs my.method()
    run('myFunc', {name: 'Oz'});    //Runs myFunc({name: 'Oz'});