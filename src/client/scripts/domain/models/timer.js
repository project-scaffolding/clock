(function(angular) {
    'use strict';

    angular
        .module('clock.domain')
        .factory('Timer', TimerProvider);

    /* @ngInject */
    function TimerProvider($q, timerState) {

        var timeInSeconds, timerPromise;

        function Timer() {
            this.hours = 0;
            this.minutes = 1;
            this.seconds = 0;
            this.soundId = null;
            this.state = timerState.notStarted;

            Object.defineProperty(this, 'isStarted', {
                get: function() {
                    return this.state === timerState.started;
                }
            });

            Object.defineProperty(this, 'isPaused', {
                get: function() {
                    return this.state === timerState.paused;
                }
            });

            Object.defineProperty(this, 'isNotStarted', {
                get: function() {
                    return this.state === timerState.notStarted;
                }
            });

            Object.defineProperty(this, 'countdown', {
                get: function() {
                    return (parseInt(this.hours) * 60 * 60) + (parseInt(this.minutes) * 60) + parseInt(this.seconds);
                }
            });

            
        }



        Timer.prototype.start = function() {
            if (this.state === timerState.notStarted) {
                this.state = timerState.started;
                timeInSeconds = (this.hours * 3600) + (this.minutes * 60) + this.seconds;
            }
            return this;
        }

        Timer.prototype.pause = function() {
            if (this.state === timerState.started) {
                this.state = timerState.paused;
            }
            return this;
        }

        Timer.prototype.cancel = function() {
            if (this.state === timerState.started || this.state === timerState.paused) {
                this.state = timerState.notStarted;

            }
            return this;
        }

        Timer.prototype.resume = function() {
            if (this.state === timerState.paused) {
                this.state = timerState.started;
            }
            return this;
        }

        Timer.prototype.getSounds = function() {
            return [];
        }

        Timer.create = function() {
            var timer = new Timer();
            return $q.when(timer);
        }

        return Timer;

    }

            

}).call(this, angular);
