(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .config(config);

    /* @ngIngect */
    function config($routeProvider) {
        $routeProvider.when('/alarms', {
            templateUrl: 'app/modules/alarm/alarms.html',
            controller: 'Alarms as vm'
        });

        $routeProvider.otherwise({
            redirectTo: '/alarms'
        });
    }

}).call(this, angular);
