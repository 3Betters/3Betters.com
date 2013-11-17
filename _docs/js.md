# JavaScript
This document contains a list of methods for different objects used by 3Betters.

## Documentation Notes
* An asterisk next to any argument means it's required.

## Debugging    `app, notice`
    app.debug(toggle);  //Set to true if <body> has .debug
    app.log(msg, data); //Displays only when app.debug(true)

    notice.add(msg, code, type, callback, icon);
    notice.remove(code);

## Authentication   `auth`
    auth.login(popup, passCallback, failCallback);
    auth.in();
    auth.token();
    auth.checked();
    auth.visualize();

## Database    `db, sheets`
    db.load(callback);
    db.create(callback);
    db.url();   //Gets the databases full url, complete with authentication token
    
    sheets.create(*title);
    sheets.load(callback);
    sheets.check();

## Pages        `page`
    page.check.requirements();