# jabiru [![Build Status](https://travis-ci.org/jeremenichelli/jabiru.svg)](https://travis-ci.org/jeremenichelli/jabiru)

Simple script to manage JSONP calls.


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

Of course every API has its own structure so you can modify the query string by calling the ```query```method. The default is ```?callback```.

```js
jabiru.query('?jsonp');
```

You can also decide the name of the method that will wrap the response. The default is ```jabiruCallback```.

```js
jabiru.naming('myMethod');
```

Every time you change the name of the method the counter will be set to ```0``` again. Also this name will be contained in the module namespace for security, in this example ```jabiru.myMethod0``` will be the name of the method use in the first call.

If you want it to be globally available you can call ```jabiru.toGlobal()``` before starting to use the script.

*Once you call this method you can back to not global state.*

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
