(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmSound', AlarmSound);

    /* @ngInject */
    function AlarmSound($window) {
        var vm = this;
        vm.title = 'Sound';
        vm.back = back;

        initialize();

        function initialize() {}

        function back() {
            $window.history.back();
        }
    }

}).call(this, angular);
