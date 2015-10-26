// karma.conf.js
module.exports = function(config) {
    config.set({
        files: [ '../src/jabiru.js', '../test/jabiru.spec.js' ],
        browsers: [ 'PhantomJS' ],
        frameworks: [ 'jasmine' ],
        reporters: [ 'spec' ]
    });
};