# jabiru [![Build Status](https://travis-ci.org/jeremenichelli/jabiru.svg)](https://travis-ci.org/jeremenichelli/jabiru)

Simple script to manage JSONP calls.

### Install

Add the distribution file to your project, it weights only **557 bytes** minified and gzipped.

```html
<script src="/scripts/jabiru.min.js"></script>
```

You can also install it as a node module.

```bash
npm install jabiru --save-dev
```

Using bower to install packages in your project?

```bash
bower install jabiru --save-dev
```


### Use

If you need to do a cross domain call **jaribu** will help you. You just need to call its **get()** method with the url and the function you need to manage the response in a configuration object.

```js
jabiru.get({
    url: 'http://some.domain.com/api/find?q=59834&format=json',
    success: function(response) {
        // do something with the response
    }
});
```

APIs have different query structure so you can modify the **jsonp** query string by calling the ```query``` present in the namespace of this project. The default is ```?callback```.

```js
jabiru.query('?jsonp');
```

The default is ```jabiruCallback```, but you can also decide the name of the method that will wrap the response using the ```naming``` function.

```js
jabiru.naming('myMethod');
```

Every time you change the name of the method the internal call counter will be set to ```0``` again. Also this name will be contained in the module namespace for security, in this example ```jabiru.myMethod0``` for the first call.

If you want it to be globally available you can call ```jabiru.toGlobal()``` before starting to use the script, but ```window.MyMethod0``` will be available for any script while the call is being made.

*Once you call *```jabiru.toGlobal()``` you can't revert to the namespace state.

### Chaining

You can chain the configuration methods to make it all by once.

```js
jabiru.toGlobal()
    .naming('githubAPI')
    .query('?callback')
    .get({
        url: 'https://api.github.com/users/octocat',
        function(response) {
            // do something with response data
        }
    });
```

*Remember you don't have to set the _name_ and the _query_ string every time. For the rest of the calls you just have to use the _get_ method.*


### Contribute

If you find a bug or something that should be added as a feature <a href="https://github.com/jeremenichelli/jabiru/issues">let me know here</a>.
