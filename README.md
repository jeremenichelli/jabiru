# jabiru

[![Build Status](https://travis-ci.org/jeremenichelli/jabiru.svg)](https://travis-ci.org/jeremenichelli/jabiru)

Simple script to manage JSONP calls.

## Install

Add the distribution file to your project, it weights only **557 bytes** minified and gzipped.

```html
<script src="/scripts/jabiru.min.js"></script>
```

You can also install it as a node module.

```bash
npm install jabiru --save
```

Using bower to install packages in your project?

```bash
bower install jabiru --save
```


## Use

If you need to do a cross domain call **jaribu** will help you. You just need to call its **get()** method with the url and the function you need to manage the response in a configuration object.

```js
jabiru.get({
    url: 'http://api.github.com/users/jeremenichelli',
    success: function(response) {
        // do something with the response
    }
});
```

### Failure

Now in v2.0.0 you can also control failure cases adding an optional `fail` method.

```js
jabiru.get({
    url: 'http://api.github.com/users/jeremenichelli',
    success: function(response) {
        console.log(response.name);
    },
    fail: function() {
        console.log('Oops!');
    }
});
```

### Query string

APIs have different query structure, for example Github's one uses `?callback` to name its jsonp method but if the api you're trying to reach needs another syntax you can use the `query` method to change it.

```js
jabiru.query('?jsonp');
```

### Callback dynamic name

Every time a request is done through **jabiru** a temporary function is created, by default that method name is ```jabiruCallback```, but you can modify that using the ```naming``` function.

```js
jabiru.naming('myMethod');
```

Every time you change the name of the method the internal call counter will be set to `0` again. Also this name will be contained in the module namespace for security, in this example `jabiru.myMethod0` for the first call.

If you want it to be globally available you can call `jabiru.toGlobal()` before starting to use the script, but `window.MyMethod0` will be available for any script while the call is being made.

*Once you call jabiru.toGlobal() you can't revert to the namespace state.*

### Chaining

You can stick all this configuration together like this:

```js
jabiru.toGlobal()
    .naming('githubAPI')
    .query('?callback')
    .get({
        url: 'https://api.github.com/users/jeremenichelli',
        function(response) {
            console.log(response.name);
        }
    });
```

*Remember you don't have to set the _name_ and the _query_ string every time. For the rest of the calls you just have to use the _get_ method.*

## Browser support and size

The last version of **jabiru** weighs only 503 bytes minified and gzipped and it works in Chrome, Firefox, Safari, Microsoft Edge, Internet Explorer 9, 10, and 11. From version `2.0.0` the support for Internet Explorer 8 was dropped.

If you want this library to work in Internet Explorer 8 you can use <a href="https://github.com/jeremenichelli/jabiru/tree/v1.1.0">v1.1.0</a>.

## Contribute

If you find a bug or something that should be added as a feature <a href="https://github.com/jeremenichelli/jabiru/issues">let me know here</a>.
