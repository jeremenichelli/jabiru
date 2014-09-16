var jabiru = (function (window) {
    var cName = 'jabiru',
        cNumber = 0;

    var _get = function (baseUrl, buffer) {
        var script = document.createElement('script'),
            callback = cName + cNumber;
        // increase callback number
        cNumber++;
        // attach event
        script.onload = script.onreadystatechange = function() {
            if ((!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                if (script) {
                    script.onreadystatechange = null;
                }
                _onload(callback, buffer);      
            }
        };
        script.src = baseUrl + '&callback=' + callback;
        window[callback] = function (data) {
            buffer = data;
        }
    }
})(this);