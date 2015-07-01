(function(angular) {
    'use strict';

    angular
        .module('clock.domain')
        .factory('Timer', TimerProvider);

    /* @ngInject */
    function TimerProvider($q, timerState) {

        function Timer() {
            this.hours = 0;
            this.minutes = 1;
            this.soundId = null;
            this.state = timerState.notStarted;
        }

        Timer.create = function() {
            var timer = new Timer();
            return $q.when(timer);
        }

        return Timer;
    }

}).call(this, angular);
