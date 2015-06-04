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
            Alarm.setEditableAlarm(null);
            $location.path('alarms/new/edit');
        }

        function activateAlarm(alarm) {
            Alarm.save(alarm);
        }

        function editAlarm(alarm) {
            Alarm.setEditableAlarm(null);
            $location.path('alarms/' + alarm.id + '/edit');
        }

        function removeAlarm(alarm) {
            Alarm.remove(alarm.id)
                .then(Alarm.all)
                .then(function(alarms) {
                    vm.alarms = alarms.filter(function(item) {
                        return item.id !== alarm.id;
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
