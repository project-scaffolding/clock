(function(angular) {
    'use strict';

    angular
        .module('clock')
        .config(routesConfig);

    /* @ngIngect */
    function routesConfig($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/alarms'
        });
    }

}).call(this, angular);
