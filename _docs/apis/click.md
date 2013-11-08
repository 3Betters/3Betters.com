# The Click API
This API let's you easily add an event to any element. To use it, simply add a `click` attribute to the element equal to a function or method.

Each function/method receives two arguments: `$this, e`. Here, `$this` refers to the element being clicked, and `e` is the click event itself.

## Examples
The following examples will alert "Hello World" whenever the anchor is clicked by setting `click` to a function in one and a property in another.

### Example 1: Function

    //HTML
    <a href="#" click="test">Hello World!</a>

    ---

    //JS
    function test($this, e){
        alert($this.text());
    }

### Example 2: Property

    //HTML
    <a href="#" click="my.object.test">Hello World!</a>

    ---

    //JS
    my = {
        object: {
            test: function($test, e){
                alert($this.text());
            }
        }
    }