(function(angular) {
    'use strict';

    angular
        .module('clock.services')
        .factory('timerService', timerServiceProvider);

    /* @ngInject */
    function timerServiceProvider($q, $log, timerRepository) {

        var timerService = {
            getTimer: getTimer,
            startTimer: startTimer,
            pauseTimer: pauseTimer,
            cancelTimer: cancelTimer,
            resumeTimer: resumeTimer,
            getSounds: getSounds
        };

        return timerService;

        function getTimer() {
            return timerRepository.findTimer();
        }

        function startTimer() {
            return $q.when()
                .then(getTimer)
                .then(function(timer) {
                    return timer.start();
                })
                .then(function(timer) {
                    $log.info('Timer is started');
                    return timer;
                });
        }

        function pauseTimer() {
            return $q.when()
                .then(getTimer)
                .then(function(timer) {
                    return timer.pause();
                })
                .then(function() {
                    $log.info('Timer is paused');
                });
        }

        function cancelTimer() {
            return $q.when()
                .then(getTimer)
                .then(function(timer) {
                    return timer.cancel();
                });
        }

        function resumeTimer() {
            return $q.when()
                .then(getTimer)
                .then(function(timer) {
                    return timer.resume();
                });
        }

        function getSounds() {
            return $q.when()
                .then(function() {
                    console.log('getSounds');
                });
            // return getTimer()
            //     .then(function(timer) {
            //         return soundService.getSounds({selectedSoundId: timer.soundId});
            //     });
        }

    }

}).call(this, angular);
