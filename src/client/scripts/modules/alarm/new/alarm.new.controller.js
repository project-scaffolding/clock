(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmNew', AlarmNew);

    /* @ngInject */
    function AlarmNew($window, alarmService, toaster) {
        var vm = this;
        vm.title = 'Add Alarm';
        vm.alarm = {};
        vm.cancel = cancel;
        vm.save = save;

        initialize();

        function initialize() {
            alarmService
                .getAlarm('new')
                .then(function(alarm) {
                    vm.alarm = alarm;
                });
        }

        function cancel() {
            $window.history.back();
        }

        function save(alarm) {
            alarmService
                .createAlarm(alarm)
                .then(function() {
                    $window.history.back();
                })
                .catch(errrorHandler)
        }

        function errrorHandler(error) {
            if (error.name === 'ValidationException') {
                for (var property in error.message) {
                    error.message[property].forEach(function(msg) {
                        toaster.pop('error', 'Validation Error', msg);
                    });
                }
            }
        }
    }

}).call(this, angular);
