(function(angular) {
    'use strict';

    angular
        .module('clock.services')
        .factory('alarmService', alarmService);

    /* @ngInject */
    function alarmService($q, $http, Alarm, alarmDao, validateService) {

        function ValidationException(message) {
            this.name = 'ValidationException',
            this.message = message;
        }

        ///////////// Interface /////////////

        var service = {
            getAlarms: getAlarms,
            getAlarm: getAlarm,
            activateAlarm: activateAlarm,
            createAlarm: createAlarm,
            updateAlarm: updateAlarm,
            removeAlarm: removeAlarm
        };

        return service;

        ////////// Implementation //////////

        function getAlarms() {
            return alarmDao.list();
        }

        function getAlarm(id) {
            if (id === 'new') {
                return alarmDao.getNew();
            } else {
                return alarmDao.get(id);
            }
        }

        function activateAlarm(alarm) {
            return alarmDao.update(alarm.id, {active: alarm.active});
        }

        function createAlarm(alarm) {
            return $q.when(alarm)
                // Validate alarm
                .then(validate)
                // Save alarm 
                .then(function(alarm) {
                    return alarmDao.create(alarm);
                });
        }

        function updateAlarm(alarm) {
            return alarmDao.update(alarm.id, alarm);
        }

        function removeAlarm(id) {
            return alarmDao.remove(id);
        }

        function validate(alarm) {
            return validateService.validate(alarm, Alarm.validation).catch(function(error) {
                throw new ValidationException(error);
            });
        }
    }

}).call(this, angular);
