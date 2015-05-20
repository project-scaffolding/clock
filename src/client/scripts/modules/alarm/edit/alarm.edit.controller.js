(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmEdit', AlarmEdit);

    /* @ngInject */
    function AlarmEdit($routeParams, $location, alarmService) {
        var vm = this;
        vm.title = 'Edit Alarm';
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
    }

}).call(this, angular);
