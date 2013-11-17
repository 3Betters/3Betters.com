![Logo](assets/img/logo.png)

**3Betters**  
_be +EV_

# Introduction
3Betters is a powerful, cloud based platform for the serious Poker player. From the very beginning it was designed to be easily modded through the **Mods Sheet** using the following API.

_Until I officially launch 3Betters, you'll have to edit your Mods directly through the **[3Betters] Spreadsheet** on your Google Drive. Eventually you'll be able to create Mods right from the site on any device :)_

### Notations and Terminology
A **sheet** represents a single worksheet within your **[3Betters] Spreadsheet**; the **Mods Sheet** refers to the sheet labeled "Mods".

> ![sheets](_bin/docs/sheets.png)

Each Mod then takes up a single row in your Mods Sheet with each column representing an **action**. Actions are read from left to right, and each action is separated with a pipe in these docs: `column1 | column2 | column3...`

The first column represents a **pointer**, a variable or function 3Betters will try to call. A list of pointers accessible to vanilla 3Betters are at the bottom of the document.

### Debugging
I definitely recommend you have debug turned on when modding, and you can do this by dropping `debug` into the first column of any row. All further actions in that row will be ignored.

To view debug information, open up your [browsers console](http://webmasters.stackexchange.com/questions/8525/how-to-open-the-javascript-console-in-different-browsers). I like [Chromes](https://www.google.com/intl/en/chrome/browser/) console the most...it's fast and lightweight.

If you [downloaded](https://github.com/3Betters/3Betters.com) the 3Betters platform, then you can also give the `<body>` tag a class of `debug` or appending `?debug` to to the URL anywhere on the site.

If you're creating a complex mod, use `app.debug(msg, data)` to display debug information. These are only displayed if debug is on, so you should just leave them in there even when you publish your mod to help out future users.

# Pointers
The following is a list of variables and functions used with the vanilla platform. Other mods may utilize their own, so you'll need to check the vendor's documents for those.

When creating your own pointers, **make sure to namespace them**! If you don't, you risk breaking other mods who are using the same namespace. If you don't know what namespacing is, just prepend your pointer with a unique string, like your name. The point is to make your pointer as unique as possible.

## Variables
### debug
Turns debug mode on (removing it turns it off). Has the same effect as adding `?debug` to the current URL or giving the `<body>` a class of `debug`.




# Custom Builds
3Betters is completely open source and you can use it to build whatever without any restriction. Commercializing your fork is perfectly legit. The only thing I require is that you place: 

_"Powered by the [3Betters](http://3betters.com) Platform. Be +EV."_

with the link somewhere on every page of your site/app that 3Betters is actually running on (the footer is a good place). Contact me for permission to remove it, I'll probably grant it!

Anyways to get started, you'll need to [download](https://github.com/3Betters/3Betters.com) the platform. It's built on top of [Kirby CMS](http://getkirby.com) and [jQuery Mobile](http://jquerymobile.com). I'm using PHP 5.5, but it might actually work with earlier versions too.

Because I'll barely have any time as it is (I did build 3Betters to improve my own game!), I can't support custom builds/forks until/if I raise money to turn the project into a fulltime company. However I have OCD, so the code is well commented and backed up with the following documents:

- [YAML](_docs/index.html?doc=yaml): List of different [Kirby YAML](http://getkirby.com/blog/structured-field-content) fields used by the site.
- Also make sure to check the /site/plugins directory for any custom PHP functions

_I am currently looking for developers. I may at some point start a KickStarter or seek funding to expand it further into a social networking platform. If you'd like to get involved, please contact me at "3betters+oz@gmail.com"._