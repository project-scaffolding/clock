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
            'clock.components',
            'clock.services',
            'clock.dao',
            'clock.models',
            'clock.alarm'
        ])
        .config(routesConfig);

    /* @ngIngect */
    function routesConfig($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/alarms'
        });
    }

}).call(this, angular);
