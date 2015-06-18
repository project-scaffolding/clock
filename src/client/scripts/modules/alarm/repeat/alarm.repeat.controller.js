(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmRepeat', AlarmRepeat);

    /* @ngInject */
    function AlarmRepeat($routeParams, $window, Alarm) {
        var vm = this;
        vm.title = 'Repeat';
        vm.alarm = {};
        vm.repeats = [];
        vm.changeRepeat = changeRepeat;
        vm.back = back;

        initialize();

        function initialize() {
            var id = $routeParams.id;
            return Alarm
                .find(id)
                .then(updateVMAlarm)
                .then(Alarm.repeats)
                .then(updateVMRepeats);
        }

        function changeRepeat() {
            vm.alarm.updateRepeats(vm.repeats);
        }

        function back() {
            $window.history.back();
        }

        function updateVMAlarm(alarm) {
            vm.alarm = alarm;
            return alarm;
        }

        function updateVMRepeats(repeats) {
            vm.repeats = repeats;
            return repeats;
        }
    }

}).call(this, angular);
