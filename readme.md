![Logo](assets/img/logo.png)

**3Betters**  
**Modding Guide**  
_be +EV_

If you're viewing this on GitHub, visit [mod.3betters.com](http://mod.3betters.com) for the best experience.


# Introduction
3Betters is a powerful, cloud based platform for all areas of Poker (learning, teaching, researching). From the very beginning it was designed to be easily moddable by anyone, regardless of programming experience, by exposing the API you'll find in this document.

## Documentation Notes
* An asterisk next to any argument means it's required.

## Debugging
To toggle console debugging, simply add `app.debug(true)` or a `app.debug(false)` to your module script. Alternatively, you can add `debug=true` to the body element if you're developing locally.












#API

## Authentication
The following can be used to login and logout the user. 3Betters always tries to log the user in automatically on the initial page load.



### **login**	auth.login(popup, pass, fail)
Attempts to log the user in if they aren't already. The standard Google login form will show in a popup if **pass** is true, otherwise it will attempt to log the user in automatically [default]. **pass** and **fail** are callback functions which are executed after the check has been made.

This method returns null, so use the callbacks. Each callback receives a single argument containing the authentication servers message.

The **pass** callback is automatically called if the user is already logged in, and gets passed `true`.

```js
//This get's executed automatically on page load
auth.login();

- - - - -
```
```html
<!-- User is shown a login form whenever the link is clicked -->
<a onclick="auth.login(true)" href="#">Login with Google</a>

- - - - -
```
```js
//### Callbacks
//Welcomes the user
function hello(result){
	alert('Hello!')
}
//Logs an error
function oops(result){
	console.log('Oops, something went wrong', result);
}

auth.login(false, hello, oops);
```



### **in**	auth.in()
Determines if the user is logged in or not.

```js
if(auth.in())
	console.log('User is logged in');
else
	console.log('User is logged out');
```