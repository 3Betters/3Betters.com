![Logo](assets/img/logo.png)

**3Betters**  
**Modding Guide**  
_be +EV_

# Introduction
3Betters is a powerful, cloud based platform for all areas of Poker (learning, teaching, researching). From the very beginning it was designed to be easily modded by anyone, regardless of programming experience, by exposing the API you'll find in this document.

The site is built on [KirbyCMS](http://getkirby.com), uses [jQuery Mobile](http://jquerymobile.com) and a customized version of the jQM [Graphite](http://driftyco.github.io/graphite/) theme. However, to get started all you need to do is download the [latest site build](https://github.com/3Betters/3Betters.com/archive/master.zip) (which is an exact clone of what's on the live site) and jump in with these docs.

## Documentation Notes
* An asterisk next to any argument means it's required.

## Debugging
Debugging is critical to creating an awesome mod that just works!

### app.debug 	`app.debug(toggle)`
Pass `true` or `false` to toggle debug mode. Turned off by default, you can force it on by giving the `<body>` a class of `debug`.

If you just want to know whether debug is enabled or not, simply don't pass anything as the method always returns the state.

### app.log 	`app.log(msg, data)`
This method let's you safely log messages to the console. Messages are only logged if `app.debug()` is true, meaning you can (and should) leave your debug messages in the tool even after publishing.

### notice.add() `notice.add(msg, code, type, callback, icon)`
Creates a new notice, which are shown to the user. **msg** is the HTML to use inside the notice and **code** is used to reference this notice when removing (you can use any combination of characters, spaces, etc). 

**type** refers to the error type, and defaults to "error" (the other option is "success").

**callback** gets added into the `onClick` attribute as-is, and you can use jQuery if you need to. By default, they are given a callback of `removeNotice($(this));` to remove the notice on click.

> ![](_bin/docs/notices.jpg)

### notice.remove() `notice.remove(code)`
Removes the notice with the given `code`, which can be either a string or an array of strings.



# API

## Authentication
The following can be used to log the user in and out. 3Betters always tries to log the user in automatically on the initial page load.



### login	`auth.login(popup, pass, fail)`
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

### in		`auth.in()`
Determines if the user is logged in or not.

```js
if(auth.in())
	console.log('User is logged in');
else
	console.log('User is logged out');
```

### token	`auth.token()`
Gets the authentication token, used when using the Spreadsheet REST API.



## Database
Google Spreadsheets are used as the database for a multitude of reasons including:

* Ubiquitousness
* Manually editing is easy
* Automatic Revisions/Backups by Google
* Realtime collaboration

### load 		`db.load(callback)`
Attempts to load the default database into `db.meta`. **callback** is called after the attempt is made and is passed a single argument, `response`, which contains the server response object.

If no callback is passed, then `response` is parsed (with the data going into `db.meta`) and `db.sheets.load()` is called, otherwise you are responsible for doing this yourself.

_Note that only the first found database will be used!_

### create 		`db.create(callback)`
Will create a new database file, calling **callback** with the servers `result` as it's only argument.

If no callback is passed, then `result` is stored into `db.meta`, otherwise you'll be responsible for populating it yourself.

This method is called automatically by 3Betters if no databases are found after logging in. This method is exposed for future releases and probably shouldn't be used in your mods unless you know what you're doing. **Seriously!**

### url		`url()`
Gets the databases URL, complete with the authentication token.

### sheets.create 	`sheets.create(*title)`
Creates a new worksheet with the given `title` if it doesn't exist.

### sheets.load 	`sheets.load(callback)`
Finds all the sheets in the database and imports their metadata. **callback** is called after the metadata is parsed.

### sheets.check 	`sheets.check()`
Verifies that the required exist. If they don't they'll be created and have defaults set.




# Hardmods
Hardmods require changing the actual source code, but gives you unlimited flexibility. However, hardmods are more difficult to publish because either you need to host the entire project with your hardmods yourself or you need to pass our [strict] screening process to have it added into future, official versions.

_This section may be sparse as our initial intent is to target modders who want to create installable mods._

## Pages
KirbyCMS uses [YAML](http://getkirby.com/blog/structured-field-content) to define page variables. And while you can create your own, the following official variables have unique properties to help you get started.

### Sidebar `(STR)`
Will search for all the children pages of `sidebar` (relative to `/content`), and creates a listview from them. The sidebars title is taken from the parents folder name, with hyphens removed and words capitalized.

	# YAML
	sidebar: tools/my-tool

	- - - - -

	// Directory
	tools
		- my-tool
			- overview
			- create
			- delete
			- help

	- - - - - 

	Outputs a listview with a title of "My Tool", and an item to each child page.

#### Order `(INT)`
Sets the page order to show the sidebar items in, in ascending order.

#### Icon `(STR)`
The icon class (without the `.icon-`) to prepend the title with.

#### Link `(STR)`
If present, clicking on the item will take you to this link instead of it's normal page URL.