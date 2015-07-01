(function(angular) {
    'use strict';

    angular
        .module('clock.timer')
        .controller('TimerSoundsController', TimerSoundsController);

    /* @ngInject */
    function TimerSoundsController($location, timerService) {
        var vm = this;
        vm.title = 'When Timer Ends';
        vm.cancel = cancel;
        vm.save = save;

        initialize();

        function initialize() {
            timerService
                .getTimer()
        }

        function cancel() {
            $location.path('timer');
        }

        function save() {
            $location.path('timer');
        }
    }

}).call(this, angular);
