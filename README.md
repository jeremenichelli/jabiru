# jabiru

Simple script to manage JSONP calls.


## Use

If you need to do a cross domain call **jaribu** will help you. You just need to call its **get()** method with the url and the method you need to manage the response:

```js
jabiru.get('http://somedomain.com/api/find?q=59834&format=json', function (data) {
        // do something
        console.log(data);
    });
```

Of course every API has its own structure so you can modify the query string by calling the ```query```method:

```js
jabiru.query('?jsonp');
```

You can also decide the name of the method that will wrap the response:

```js
jabiru.name('myMethod');
```

Every time you change the name of the method the counter will be set to ```0``` again. Also this name will be contained in the module namespace for security, in this case ```jabiru.myMethod0``` for the first call.

If you want it to be global available you can call ```jabiru.toGlobal()``` before starting to use the script.

## Contribute

If you fin anything that can be added or modify just contact me. Thanks!
