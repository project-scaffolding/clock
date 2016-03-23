(function() {
    'use strict';

    angular
        .module('clock.domain')
        .factory('Alarm', AlarmProvider);

    /* @ngInject */
    function AlarmProvider($q, AlarmEntity, alarmResource, validationService, Repeat) {

        var editableAlarm;

        function Alarm() {}
        // Find all alarms
        Alarm.prototype.all = all;
        // Find alarm by id
        Alarm.prototype.find = find;
        // Create or update alarm
        Alarm.prototype.save = save;
        // Delete alarm
        Alarm.prototype.remove = remove;
        // Delete cached alarm
        Alarm.prototype.removeEditableAlarm = removeEditableAlarm;
        // Create collection of repeats
        Alarm.prototype.repeats = repeats;

        return new Alarm();

        /**
         * @description
         * Find all alarms and return list of alarm entities.
         * @returns {object} Promise object that returns list of alarms.
         */
        function all() {
            return $q.when()
                .then(alarmResource.list)
                .then(createAlarms);
        }

        /**
         * @description
         * Find alarm by id and return new or cached alarm.
         * @param {number} id
         * @returns {object} Promise object that returns alarm.
         */
        function find(id) {
            // TODO: add strategy pattern here
            if (editableAlarm && editableAlarm.id === id) {
                return $q.when(editableAlarm);
            } else {
                if (id === 'new') {
                    return $q.when(id)
                        .then(AlarmEntity.createNewAlarm)
                        .then(setEditableAlarm);
                } else {
                    return $q.when(id)
                        .then(alarmResource.get)
                        .then(AlarmEntity.createAlarm)
                        .then(setEditableAlarm);
                }
            }
        }

        /**
         * @description
         * Validate alarm and then create/update the alarm.
         * @param {number} id
         * @returns {object} Promise object that returns alarm.
         */
        function save(alarm) {
            var saveAlarm = alarm.id ? alarmResource.update : alarmResource.create;

            return $q.when(alarm)
                    .then(validateAlarm).catch(validationException)
                    .then(saveAlarm).catch(saveException);
        }

        function remove(id) {
            return $q.when(id)
                .then(alarmResource.remove)
                .then(function() {
                    return id;
                });
        }

        function removeEditableAlarm() {
            editableAlarm = null;
        }

        function repeats(alarm) {
            return Repeat.select(alarm.repeats);
        }

        function createAlarms(alarms) {
            alarms = alarms.map(AlarmEntity.createAlarm);
            return $q.all(alarms);
        }

        function createRepeats(res) {
            var alarm = res[0];
            var repeats = res[1];

            repeats = repeats.map(function(repeat) {
                var index = alarm.repeats.indexOf(repeat.weekDay);
                if (index !== -1) {
                    repeat.active = true;
                } else {
                    repeat.active = false;
                }
                return repeat;
            });

            return $q.all(repeats);
        }

        function setEditableAlarm(alarm) {
            editableAlarm = alarm;
            return alarm;
        }

        function validateAlarm(alarm) {
            return validationService.validate(alarm, AlarmEntity.validates);
        }

        function validationException(error) {
            return ExceptionManager({
                name: 'ValidationException',
                message: error
            }, error);
        }

        function saveException(error) {
            return ExceptionManager({
                name: 'SaveException',
                message: error
            }, error);
        }

        function ExceptionManager(newError, oldError) {
            if (oldError.name) {
                return $q.reject(oldError);
            } else {
                return $q.reject(newError);
            }
        }

    }

}).call(this, angular);
