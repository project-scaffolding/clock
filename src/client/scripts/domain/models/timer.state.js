(function(angular) {
    'use strict';

    angular
        .module('clock.domain')
        .value('timerState', {
            notStarted: 'NOT_STARTED',
            started: 'STARTED',
            paused: 'PAUSED'
        });

}).call(this, angular);
