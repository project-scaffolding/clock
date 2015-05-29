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
            'clock.dao',
            'clock.models',
            'clock.services',
            'clock.alarm'
        ])
        .config(routesConfig)
        .value('validate', validate);

    /* @ngIngect */
    function routesConfig($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/alarms'
        });
    }

}).call(this, angular, validate);
