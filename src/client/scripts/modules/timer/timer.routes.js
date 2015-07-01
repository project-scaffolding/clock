(function(angular) {
    'use strict';

    angular
        .module('clock.timer')
        .config(routesConfig);

    /* @ngIngect */
    function routesConfig($routeProvider) {
        $routeProvider.when('/timer', {
            templateUrl: 'scripts/modules/timer/timer.html',
            controller: 'TimerController as vm'
        });

        $routeProvider.when('/timer/sounds', {
            templateUrl: 'scripts/modules/timer/timer.sounds.html',
            controller: 'TimerSoundsController as vm'
        });

    }

}).call(this, angular);
