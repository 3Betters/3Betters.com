# YAML
The following is a list of all the custom [Kirby YAML](http://getkirby.com/blog/structured-field-content) fields used throughout the site.

## Listview related
The following are related to [listviews](http://jquerymobile.com/demos/1.3.0-rc.1/docs/demos/widgets/listviews/) created with the `Listview\page()` Function.

### Icon
`(STR)` The icon-class used for the page in a listview. See [/assets/styles/fonts/fonts.scss](/assets/styles/fonts/fonts.scss) for a list of icon classes. Do not prepend with '.icon-'.

For example, `Icon: bankroll` will display the `.icon-bankroll` icon when shown in a listview.

### Link
`(STR)` Used to link to an external page when shown in a listview.

### Order
`(INT)` The pages [ascending] order within a listview.

### Sidebar
`(STR)` The folder, relative to `/content/` to use as the sidebar when viewing the page.

### Redirect
`(STR)` The page to redirect to when visiting the page, relative to `/content/`.




## JavaScript Related
List of JavaScript related variables.

### RequiresLogin
`(Any)` Determines whether the page requires the user to be logged in. If they aren't, then a message is shown and any content within a `.requires-login` class is hidden.