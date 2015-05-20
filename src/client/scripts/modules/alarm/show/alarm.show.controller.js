(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmShow', AlarmShow);

    /* @ngInject */
    function AlarmShow($routeParams, $location, $window, alarmService) {
        var vm = this;
        vm.title = '';
        vm.alarm = {};
        vm.back = back;

        initialize();

        function initialize() {
            var id = $routeParams.id;
            alarmService
                .getAlarm(id)
                .then(function(alarm) {
                    vm.alarm = alarm;
                })
                .catch(function() {
                    $location.path('alarms');
                });

            vm.title = 'Alarm (' + $routeParams.id + ')';
        }

        function back() {
            $window.history.back();
        }
    }

}).call(this, angular);
