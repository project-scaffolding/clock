(function(angular) {
    'use strict';

    angular
        .module('clock.models')
        .factory('Alarm', AlarmModel);

    /* @ngInject */
    function AlarmModel($q) {

        function Alarm() {
            this.id = null;
            this.hours = 0;
            this.minutes = 0;
            this.label = 'Alarm';
            this.active = true;
            this.snooze = true;
        }

        Alarm.validation = {
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
        }

        Alarm.createAlarm = function(obj) {
            var alarm = new Alarm();
            alarm.id = obj._id;
            alarm.hours = obj.hours;
            alarm.minutes = obj.minutes;
            alarm.label = obj.label;
            alarm.active = obj.active;
            alarm.snooze = obj.snooze;

            return $q.when(alarm);
        }

        Alarm.createNewAlarm = function() {
            var date = new Date();
            var alarm = new Alarm();
            alarm.hours = date.getHours();
            alarm.minutes = date.getMinutes();

            return $q.when(alarm);
        }

        return Alarm;

    }

}).call(this, angular);
