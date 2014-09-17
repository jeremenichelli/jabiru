# jabiru

Simple script to manage JSONP calls.


## Use
If you need to do a cross domain call **jaribu** will help you. You just need to call its **get()** method with the url and the method you need to manage the response:

```js
jabiru.get('http://somedomain.com/api/find?q=12345&format=json', function (data) {
        // do something
        console.log(data);
    });
```

Take note that **jabiru** will add *&callback=<TEMPORARY_CALLBACK_NAME>* to the url. If the API you will be working has a different format the make the changes locally so it format of the url you are sending is the correct.


## Contribute

If you fin anything that can be added or modify just contact me. Thanks!
