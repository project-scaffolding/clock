(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmList', AlarmList);

    /* @ngInject */
    function AlarmList(alarmService) {
        var vm = this;
        vm.title = 'Alarms';
        vm.alarms = [];

        initialize();

        function initialize() {
            alarmService
                .getAlarms()
                .then(function(alarms) {
                    vm.alarms = alarms;
                });
        }
    }

}).call(this, angular);
