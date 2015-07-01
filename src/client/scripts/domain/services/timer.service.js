(function(angular) {
    'use strict';

    angular
        .module('clock.domain')
        .factory('timerService', timerServiceProvider);

    /* @ngInject */
    function timerServiceProvider(timerRepository) {

        var timerService = {
            getTimer: getTimer,
            getSounds: getSounds
        };

        return timerService;

        function getTimer() {
            return timerRepository.findTimer();
        }

        function getSounds() {
            console.log('getSounds');
            // return getTimer()
            //     .then(function(timer) {
            //         return soundService.getSounds({selectedSoundId: timer.soundId});
            //     });
        }

    }

}).call(this, angular);
