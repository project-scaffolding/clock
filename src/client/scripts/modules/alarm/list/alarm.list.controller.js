(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmList', AlarmList);

    /* @ngInject */
    function AlarmList($location, alarmDao) {
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
            alarmDao
                .getAllAlarms()
                .then(function(alarms) {
                    vm.alarms = alarms;
                });
        }

        function addAlarm() {
            alarmDao.setEditableAlarm(null);
            $location.path('alarms/new/edit');
        }

        function activateAlarm(alarm) {
            alarmDao.saveAlarm(alarm)
        }

        function editAlarm(alarm) {
            alarmDao.setEditableAlarm(null);
            $location.path('alarms/' + alarm.id + '/edit');
        }

        function removeAlarm(alarm) {
            alarmDao
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
