(function(angular) {
    'use strict';

    angular
        .module('clock.domain')
        .factory('AlarmEntity', AlarmEntityProvider);

    /* @ngInject */
    function AlarmEntityProvider($q) {

        function AlarmEntity() {
            this.id = null;
            this.hours = 0;
            this.minutes = 0;
            this.label = 'Alarm';
            this.active = true;
            this.snooze = true;
        }

        AlarmEntity.validates = {
            hours: {
                presence: true,
                numericality: {
                    greaterThanOrEqualTo: 0,
                    lessThan: 24
                }
            },
            minutes: {
                presence: true,
                numericality: {
                    greaterThanOrEqualTo: 0,
                    lessThan: 60
                }
            },
            label: {
                presence: true
            }
        };

        AlarmEntity.createAlarm = function(obj) {
            var alarm = new AlarmEntity();
            alarm.id = obj.id;
            alarm.hours = obj.hours;
            alarm.minutes = obj.minutes;
            alarm.label = obj.label;
            alarm.active = obj.active;
            alarm.snooze = obj.snooze;

            return $q.when(alarm);
        };

        AlarmEntity.createNewAlarm = function() {
            var date = new Date();
            var alarm = new AlarmEntity();
            alarm.hours = date.getHours();
            alarm.minutes = date.getMinutes();

            return $q.when(alarm);
        };

        return AlarmEntity;

    }

}).call(this, angular);
