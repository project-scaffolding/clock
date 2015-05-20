(function(angular) {
    'use strict';

    angular
        .module('clock.components')
        .filter('alarmNumber', alarmNumber);

    /* @ngInject */
    function alarmNumber() {
        return function(input) {
            var output = String(input);

            if (output.length === 1) {
                output = '0' + output;
            }

            return output;
        };
    }

}).call(this, angular);
