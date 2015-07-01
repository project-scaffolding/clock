(function(angular, validate) {
    'use strict';

    angular
        .module('clock', [
            // Angular Modules
            'ngRoute',
            'ngResource',
            'ngAnimate',

            // 3-rd Part modules
            'toaster',

            // Application Modules
            'clock.services',
            'clock.infrastructure',
            'clock.domain',
            'clock.components',
            // 'clock.alarm',
            'clock.timer'
        ]);

}).call(this, angular);
