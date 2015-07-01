(function(angular) {
    'use strict';

    angular
        .module('clock.timer')
        .controller('TimerController', TimerController);

    /* @ngInject */
    function TimerController($location, timerService) {
        var vm = this;
        vm.title = 'Timer';
        vm.timer = {};
        vm.startTimer = startTimer;
        vm.cancelTimer = cancelTimer;
        vm.pauseTimer = pauseTimer;
        vm.resumeTimer = resumeTimer;
        vm.navigateToSounds = navigateToSounds

        initialize();

        function initialize() {
            timerService
                .getTimer()
                .then(updateTimer);
        }

        function startTimer() {

        }

        function cancelTimer() {

        }

        function pauseTimer() {

        }

        function resumeTimer() {

        }

        function navigateToSounds() {
            $location.path('timer/sounds');
        }

        function updateTimer(timer) {
            vm.timer = timer;
            return timer;
        }
    }

}).call(this, angular);
