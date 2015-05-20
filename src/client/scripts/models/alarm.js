(function(angular) {
    'use strict';

    angular
        .module('clock.models')
        .factory('Alarm', AlarmModel);

    /* @ngInject */
    function AlarmModel() {

        function Alarm() {
            this.id = null;
            this.hours = 0;
            this.minutes = 0;
            this.label = 'Alarm';
            this.active = true;
            this.snooze = true;

            // TODO: formatted values for presentation layer
        }

        return Alarm;

    }

}).call(this, angular);
