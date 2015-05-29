(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmLabel', AlarmLabel);

    /* @ngInject */
    function AlarmLabel($location, $routeParams, $window, alarmService) {
        var vm = this;
        vm.title = 'Label';
        vm.back = back;
        vm.changeLabel = changeLabel;
        vm.alarm = {};

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
        }

        function back() {
            $window.history.back();
        }

        function changeLabel(label) {
            alarmService.
            vm.alarm.label = label;
        }
    }

}).call(this, angular);
