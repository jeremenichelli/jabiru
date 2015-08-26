/*
 * jabiru - v1.1.0
 * Simple script to manage JSONP calls
 * https://github.com/jeremenichelli/jabiru
 * 2014 (c) Jeremias Menichelli - MIT License
*/

(function(root, factory) {
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
})(this, function() {
    'use strict';

    var cName, cNumber, query, isGlobal = false, jabiru = {},
        ref = document.getElementsByTagName('script')[0];

    jabiru.get = function(config) {
        // if config object doesn't contain url and
        // a success callback method throw an error
        if (!config || typeof config.url !== 'string' || typeof config.success !== 'function') {
            throw new Error('Invalid option object argument');
        }

        var script = document.createElement('script'),
            callbackId = cName + cNumber,
            scope = isGlobal ? window : window.jabiru,
            scopeQuery = isGlobal ? '' : 'jabiru.',
            callback = config.success,
            baseUrl = config.url;

        // increase callback number
        cNumber++;

        // make padding method global
        scope[callbackId] = function(data) {
            if (typeof callback === 'function') {
                callback(data);
            } else {
                throw new Error('You must specify a method as a callback');
            }
        };

        function onScriptLoaded(responseData) {
            // unable callback and data ref
            scope[callbackId] = responseData = null;

            // erase script element
            script.parentNode.removeChild(script);
        }

        // attach event
        script.onload = script.onerror = script.onreadystatechange = function(response) {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                if (script) {
                    script.onreadystatechange = null;
                }
                onScriptLoaded(response);
            }
        };

        script.src = baseUrl + query + '=' + scopeQuery + callbackId;

        // insert strategy supported on Paul Irish post:
        // http://www.paulirish.com/2011/surefire-dom-element-insertion/
        ref.parentNode.insertBefore(script, ref);
    };

    jabiru.naming = function(str) {
        if (typeof str === 'string') {
            cName = str;
            cNumber = 0;
            return jabiru;
        } else {
            throw new Error('Callback name must be a string');
        }
    };

    jabiru.query = function(str) {
        if (typeof str === 'string') {
            query = str;
            return jabiru;
        } else {
            throw new Error('Query name must be a string');
        }
    };

    jabiru.toGlobal = function() {
        isGlobal = true;
        return jabiru;
    };

    jabiru.naming('jabiruCallback');
    jabiru.query('?callback');

    return jabiru;
});
