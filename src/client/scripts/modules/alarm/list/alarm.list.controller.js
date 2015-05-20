(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmList', AlarmList);

    /* @ngInject */
    function AlarmList($location, alarmService) {
        var vm = this;
        vm.title = 'Alarms';
        vm.alarms = [];
        vm.addAlarm = addAlarm;
        vm.alarmOnClickHandler = alarmOnClickHandler;

        initialize();

        function initialize() {
            alarmService
                .getAlarms()
                .then(function(alarms) {
                    vm.alarms = alarms;
                });
        }

        function addAlarm() {
            //alarmService.createNewAlarm();
            $location.path('alarms/new');
        }

        function alarmOnClickHandler(alarm) {
            $location.path('alarms/' + alarm._id);
        }
    }

}).call(this, angular);
