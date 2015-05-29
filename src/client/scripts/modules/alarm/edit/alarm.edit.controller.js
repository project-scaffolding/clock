(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmEdit', AlarmEdit);

    /* @ngInject */
    function AlarmEdit($location, $routeParams, $window, alarmService, toaster) {
        var vm = this;
        vm.title = '';
        vm.alarm = {};
        vm.cancel = cancel;
        vm.save = save;
        vm.label = label;

        initialize();

        function initialize() {
            var id = $routeParams.id;
            vm.title = id === 'new' ? 'Add Alarm' : 'Edit Alarm';
            alarmService
                .getAlarm(id)
                .then(function(alarm) {
                    vm.alarm = alarm;
                })
                .catch(function() {
                    $location.path('alarms');
                });                
        }

        function label(alarm) {
            $location.path('alarms/' + alarm.id + '/label');
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
