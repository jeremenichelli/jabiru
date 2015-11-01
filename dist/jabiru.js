/*
 * jabiru - v1.1.1
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

    var cName,
        cNumber,
        query,
        isGlobal = false,
        jabiru = {},
        _doc = document,
        ref = _doc.getElementsByTagName('script')[0] || _doc.head || _doc.body;

    jabiru.get = function(config) {
        // if config object doesn't contain url and
        // a success callback method throw an error
        if (!config || typeof config.url !== 'string' || typeof config.success !== 'function'
                || config.fail && typeof config.fail !== 'function') {
            throw new Error('Invalid option object argument');
        }

        var script = _doc.createElement('script'),
            callbackId = cName + cNumber,
            scope = isGlobal ? window : window.jabiru,
            scopeQuery = isGlobal ? '' : 'jabiru.';

        // increase callback number
        cNumber++;

        // make padding method global
        scope[callbackId] = config.success;

        function onScriptLoaded() { // eslint-disable-line func-style
            // unable callback and data ref
            scope[callbackId] = null;

            // erase script element
            script.parentNode.removeChild(script);
        }

        // attach events
        script.onload = onScriptLoaded;

        if (config.fail) {
            script.onerror = function() {
                config.fail();
                onScriptLoaded();
            };
        }

        script.src = config.url + query + '=' + scopeQuery + callbackId;

        // insert strategy supported on Paul Irish post:
        // http://www.paulirish.com/2011/surefire-dom-element-insertion/
        ref.parentNode.insertBefore(script, ref);
    };

    jabiru.naming = function(str) {
        if (typeof str !== 'string') {
            throw new Error('Callback name must be a string');
        } else {
            cName = str;
            cNumber = 0;
            return jabiru;
        }
    };

    jabiru.query = function(str) {
        if (typeof str !== 'string') {
            throw new Error('Query name must be a string');
        } else {
            query = str;
            return jabiru;
        }
    };

    jabiru.toGlobal = function() {
        isGlobal = true;
        return jabiru;
    };

    // set default configuration
    jabiru.naming('jabiruCallback');
    jabiru.query('?callback');

    return jabiru;
});
