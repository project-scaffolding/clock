(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmEdit', AlarmEdit);

    /* @ngInject */
    function AlarmEdit($location, $routeParams, $window, Alarm, toaster) {
        var vm = this;
        vm.title = '';
        vm.alarm = {};
        vm.cancel = cancel;
        vm.save = save;
        vm.repeat = repeat;
        vm.label = label;
        vm.sound = sound;

        initialize();

        function initialize() {
            var id = $routeParams.id;
            vm.title = id === 'new' ? 'Add Alarm' : 'Edit Alarm';
            Alarm.get(id)
                .then(function(alarm) {
                    vm.alarm = alarm;
                })
                .catch(function() {
                    $location.path('alarms');
                });                
        }

        function repeat(alarm) {
            $location.path('alarms/' + alarm.id + '/repeat');
        }

        function label(alarm) {
            $location.path('alarms/' + alarm.id + '/label');
        }

        function sound(alarm) {
            $location.path('alarms/' + alarm.id + '/sound');
        }

        function cancel() {
            goBack();
        }

        function save(alarm) {
            Alarm.save(alarm)
                .then(goBack)
                .catch(errrorHandler)
        }

        function goBack() {
            Alarm.setEditableAlarm(null);
            $window.history.back();
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
