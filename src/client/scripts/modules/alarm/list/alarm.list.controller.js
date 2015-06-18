(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmList', AlarmList);

    /* @ngInject */
    function AlarmList($location, Alarm) {
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
            Alarm.all().then(function(alarms) {
                vm.alarms = alarms;
            });
        }

        function addAlarm() {
            Alarm.removeEditableAlarm();
            $location.path('alarms/new/edit');
        }

        function activateAlarm(alarm) {
            Alarm.save(alarm);
        }

        function editAlarm(alarm) {
            Alarm.removeEditableAlarm();
            $location.path('alarms/' + alarm.id + '/edit');
        }

        function removeAlarm(alarm) {
            return Alarm
                .remove(alarm.id)
                .then(function(id) {
                    vm.alarms = vm.alarms.filter(function(alarm) {
                        return alarm.id !== id;
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
