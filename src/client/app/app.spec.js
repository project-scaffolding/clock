/*global describe, beforeEach, it, expect */
/*jshint expr: true */
(function() {
    'use strict';

    describe('App', function() {

        var module;
        beforeEach(function() {
            module = angular.module('app.core');
        });

        it('should be registered', function() {
            expect(module).not.to.equal(null);
        });
    });

}).call(this);
