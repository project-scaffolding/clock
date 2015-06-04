(function(angular) {
    'use strict';

    angular
        .module('clock.domain')
        .factory('Alarm', AlarmProvider);

    /* @ngInject */
    function AlarmProvider($q, AlarmEntity, alarmResource) {

        var editableAlarm;

        var Alarm = {
            all: all,
            get: get,
            save: save,
            remove: remove,
            setEditableAlarm: setEditableAlarm
        };

        return Alarm;

        function all() {
            return $q.when()
                .then(alarmResource.list)
                .then(createAlarms);
        }

        function get(id) {
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

        function save(alarm) {
            if (alarm.id) {
                return alarmResource.update(alarm);
            } else {
                return alarmResource.create(alarm);
            }
        }

        function remove(id) {
            return $q.when(id)
                .then(alarmResource.remove);
        }

        function createAlarms(alarms) {
            alarms = alarms.map(AlarmEntity.createAlarm);
            return $q.all(alarms);
        }

        function setEditableAlarm(alarm) {
            editableAlarm = alarm;
            return alarm;
        }

    }

}).call(this, angular);
