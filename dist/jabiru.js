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

    var cName = 'jabiru',
        cNumber = 0;

    var _get = function (baseUrl, callback) {
        var script = document.createElement('script'),
            callbackId = cName + cNumber;

        // increase callback number
        cNumber++;

        // make padding method global
        window[callbackId] = function (data) {
            callback(data);
        };

        function onCallbackFinished (responseData) {
            // unable callback
            window[callbackId] = responseData = null;

            // erase script element
            script.parentNode.removeChild(script);
        }

        // attach event
        script.onload = script.onreadystatechange = function (response) {
            if ((!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                if (script) {
                    script.onreadystatechange = null;
                }
                onCallbackFinished(response);
            }
        };
        script.src = baseUrl + '&callback=' + callbackId;
        document.head.appendChild(script);
    };

    return {
        get: _get
    };
});
