(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .config(routesConfig);

    /* @ngIngect */
    function routesConfig($routeProvider) {
        $routeProvider.when('/alarms', {
            templateUrl: 'scripts/modules/alarm/list/alarm.list.html',
            controller: 'AlarmList as vm'
        });

        $routeProvider.when('/alarms/:id/edit', {
            templateUrl: 'scripts/modules/alarm/edit/alarm.edit.html',
            controller: 'AlarmEdit as vm'
        });

        $routeProvider.when('/alarms/:id/repeat', {
            templateUrl: 'scripts/modules/alarm/repeat/alarm.repeat.html',
            controller: 'AlarmRepeat as vm'
        });

        $routeProvider.when('/alarms/:id/label', {
            templateUrl: 'scripts/modules/alarm/label/alarm.label.html',
            controller: 'AlarmLabel as vm'
        });

        $routeProvider.when('/alarms/:id/sound', {
            templateUrl: 'scripts/modules/alarm/sound/alarm.sound.html',
            controller: 'AlarmSound as vm'
        });

    }

}).call(this, angular);
