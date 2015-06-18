(function(angular) {
    'use strict';

    angular
        .module('clock.domain')
        .factory('AlarmEntity', AlarmEntityProvider);

    /* @ngInject */
    function AlarmEntityProvider($q, validationService, Repeat) {

        /**
         * @cunstructor
         * Define default properties and values.
         */
        function AlarmEntity() {
            this.id = null;
            this.hours = 0;
            this.minutes = 0;
            this.label = 'Alarm';
            this.active = true;
            this.snooze = true;
            this.repeats = [];
            this.soundId = null;

            this.repeatLabel = 'Never';
        }

        AlarmEntity.prototype.updateRepeats = function(repeats) {
            function active(repeat) {
                return repeat.active;
            }

            function weekDay(repeat) {
                return repeat.weekDay;
            }

            this.repeats = repeats.filter(active).map(weekDay);
            this.repeatLabel = Repeat.label(repeats);
            return this;
        };

        /**
         * Validation rules
         */
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

        /**
         * Alarm factory creates new instance of AlarmEntity
         * based on provided params.
         * @params params {object}
         * @returns {object} alarm promise
         */
        AlarmEntity.createAlarm = function(params) {
            var alarm = new AlarmEntity();
            alarm.id = params.id;
            alarm.hours = params.hours;
            alarm.minutes = params.minutes;
            alarm.label = params.label;
            alarm.active = params.active;
            alarm.snooze = params.snooze;
            alarm.repeats = params.repeats;
            alarm.soundId = params.soundId;

            return Repeat.select(params.repeats).then(function(repeats) {
                alarm.repeatLabel = Repeat.label(repeats);
                return alarm;
            });
        };

        /**
         * Alarm factory creates new instance of AlarmEntity
         * where current time is set.
         * @returns {object} alarm promise
         */
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
