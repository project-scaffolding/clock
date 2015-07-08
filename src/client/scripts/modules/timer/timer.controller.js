(function(angular) {
    'use strict';

    angular
        .module('clock.timer')
        .controller('TimerController', TimerController);

    /* @ngInject */
    function TimerController($scope, $location, $document, $window, timerService) {
        var vm = this;
        vm.title = 'Timer';
        vm.timer = {};
        vm.startTimer = startTimer;
        vm.cancelTimer = cancelTimer;
        vm.pauseTimer = pauseTimer;
        vm.resumeTimer = resumeTimer;
        vm.navigateToSounds = navigateToSounds;

        initialize();

        function initialize() {
            timerService
                .getTimer()
                .then(function(timer) {
                    vm.timer = timer;
                    return timer; 
                });

            $scope.$on('timer-stopped', function() {
                $scope.$apply(function() {
                    timerService
                        .cancelTimer()
                        .then(startPlaySound)
                        .then(showAlert);
                });  
            });
        }

        // Start timer
        // Change timer state to started
        // Hide start button
        // Show cancel button
        function startTimer() {
            timerService
                .startTimer()
                .then(function() {
                    $scope.$broadcast('timer-start');
                });
        }

        // Cancel timer
        // Change timer state to not started
        // Hide cancel button
        // Show start button
        function cancelTimer() {
            timerService
                .cancelTimer()
                .then(function() {
                    $scope.$broadcast('timer-clear');
                });
        }

        // Pause timer
        // Change timer state to paused
        // Hide pause button
        // Show resume button
        function pauseTimer() {
            timerService
                .pauseTimer()
                .then(function() {
                    $scope.$broadcast('timer-clear');
                });
        }

        // Resume timer
        // Change timer state to paused
        // Hide resume button
        // Show pause button
        function resumeTimer() {
            timerService
                .resumeTimer()
                .then(function() {
                    $scope.$broadcast('timer-start');
                });
        }

        // Navigate to Sounds page
        function navigateToSounds() {
            $location.path('timer/sounds');
        }

        function startPlaySound() {
            $document.find('#timer-sound')[0].play();
        }

        function stopPlaySound() {
            $document.find('#timer-sound')[0].pause();
        }

        function showAlert() {
            $window.alert('Timer done');
            stopPlaySound();
        }
    }

}).call(this, angular);
