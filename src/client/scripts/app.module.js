(function(angular) {
    'use strict';

    angular
        .module('clock', [
            // Angular Modules
            'ngRoute',
            'ngResource',

            // 3-rd Part modules

            // Application Modules
            'clock.components',
            'clock.models',
            'clock.services',
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
