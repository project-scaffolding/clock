(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .config(config);

    /* @ngIngect */
    function config($routeProvider) {
        $routeProvider.when('/alarms', {
            templateUrl: 'scripts/modules/alarm/alarm.list.html',
            controller: 'AlarmList as vm'
        });

        $routeProvider.when('/alarms/new', {
            templateUrl: 'scripts/modules/alarm/alarm.new.html',
            controller: 'AlarmNew as vm'
        });

        $routeProvider.when('/alarms/:id/edit', {
            templateUrl: 'scripts/modules/alarm/alarm.edit.html',
            controller: 'AlarmEdit as vm'
        });

        $routeProvider.when('/alarms/:id', {
            templateUrl: 'scripts/modules/alarm/alarm.show.html',
            controller: 'AlarmShow as vm'
        });

        $routeProvider.otherwise({
            redirectTo: '/alarms'
        });
    }

}).call(this, angular);
