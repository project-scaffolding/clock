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
        vm.editMode = false;
        vm.edit = edit;
        vm.activateAlarm = activateAlarm;
        vm.editAlarm = editAlarm;
        vm.removeAlarm = removeAlarm;
        vm.done = done;

        initialize();

        function initialize() {
            alarmService
                .getAlarms()
                .then(function(alarms) {
                    vm.alarms = alarms;
                });
        }

        function addAlarm() {
            $location.path('alarms/new/edit');
        }

        function activateAlarm(alarm) {
            alarmService.activateAlarm(alarm)
        }

        function editAlarm(alarm) {
            $location.path('alarms/' + alarm.id + '/edit');
        }

        function removeAlarm(alarm) {
            alarmService
                .removeAlarm(alarm.id)
                .then(function() {
                    vm.alarms = vm.alarms.filter(function(model) {
                        return model.id !== alarm.id;
                    });
                });
        }

        function edit() {
            vm.editMode = true;
        }

        function done() {
            vm.editMode = false;
        }
    }

}).call(this, angular);
