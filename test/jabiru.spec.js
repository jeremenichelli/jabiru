(function() {
    'use strict';

    describe('jabiru', function() {
        describe('Global access', function() {
            it('jabiru namespace available in window', function() {
                expect(typeof window.jabiru).toBe('object');
            });
            it('get method available at jabiru namespace', function() {
                expect(typeof window.jabiru.get).toBe('function');
            });
            it('name method available at jabiru namespace', function() {
                expect(typeof window.jabiru.name).toBe('function');
            });
            it('query method available at jabiru namespace', function() {
                expect(typeof window.jabiru.query).toBe('function');
            });
            it('toGlobal method available at jabiru namespace', function() {
                expect(typeof window.jabiru.toGlobal).toBe('function');
            });
        });
    });
})();