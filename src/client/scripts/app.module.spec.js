/*global describe, beforeEach, it, expect */
/*jshint expr: true */
(function() {
    'use strict';

    describe('Clock module', function() {

        var module;
        beforeEach(function() {
            module = angular.module('clock');
        });

        it('should be registered', function() {
            expect(module).not.to.equal(null);
        });
    });

}).call(this);
