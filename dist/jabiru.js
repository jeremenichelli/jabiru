// jabiru - Jeremias Menichelli
// https://github.com/jeremenichelli/jabiru - MIT License
(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.jabiru = factory(root);
    }
})(this, function () {
    'use strict';

    var cName, cNumber, query, isGlobal = false,
        head = document.head || document.getElementsByTagName('head')[0] || document.body;

    var _get = function (baseUrl, callback) {
        var script = document.createElement('script'),
            callbackId = cName + cNumber,
            scope = isGlobal ? window : window.jabiru,
            scopeQuery = isGlobal ? '' : 'jabiru.';

        // increase callback number
        cNumber++;

        // make padding method global
        scope[callbackId] = function (data) {
            if (typeof callback === 'function') {
                callback(data);
            } else {
                console.error('You must specify a method as a callback');
            }
        };

        function onScript (responseData) {
            // unable callback and data ref
            scope[callbackId] = responseData = null;

            // erase script element
            script.parentNode.removeChild(script);
        }

        // attach event
        script.onload = script.onreadystatechange = function (response) {
            if ((!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                if (script) {
                    script.onreadystatechange = null;
                }
                onScript(response);
            }
        };

        script.src = baseUrl + query + '=' + scopeQuery + callbackId;
        head.appendChild(script);
    };

    var _setCallbackName = function (str) {
        if (typeof str === 'string') {
            cName = str;
            cNumber = 0;
        } else {
            console.error('Callback name must be a string');
        }
    };

    var _setQueryName = function (str) {
        if (typeof str === 'string') {
            query = str;
        } else {
            console.error('Query name must be a string');
        }
    };

    var _setToGlobal = function () {
        isGlobal = true;
    };

    _setCallbackName('callback');
    _setQueryName('?callback');

    return {
        get: _get,
        name: _setCallbackName,
        query: _setQueryName,
        toGlobal: _setToGlobal
    };
});
