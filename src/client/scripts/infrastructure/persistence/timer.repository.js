(function(angular) {
    'use strict';

    angular
        .module('clock.infrastructure')
        .factory('timerRepository', timerRepositoryProvider);

    /* @ngInject */
    function timerRepositoryProvider($q, Timer) {

        var timer;

        var timerRepository = {
            findTimer: findTimer
        };

        return timerRepository;

        function findTimer() {
            if (timer) {
                return $q.when(timer)
            } else {
                return $q.when(Timer.create())
                    .then(function(createdTimer) {
                        timer = createdTimer;
                        return createdTimer;
                    });
            }
        }

    }

}).call(this, angular);
