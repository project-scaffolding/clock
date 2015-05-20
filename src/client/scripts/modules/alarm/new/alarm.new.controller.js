(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmNew', AlarmNew);

    /* @ngInject */
    function AlarmNew($window) {
        var vm = this;
        vm.title = 'Add Alarm';
        vm.back = back;

        initialize();

        function initialize() {}

        function back() {
            $window.history.back();
        }
    }

}).call(this, angular);
