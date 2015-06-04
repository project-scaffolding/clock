(function(angular) {
    'use strict';

    angular
        .module('clock.dao')
        .factory('alarmDao', alarmDao);

    /* @ngInject */
    function alarmDao($q, $resource, Alarm, alarmParser, validationService) {
        // Data Layer Frame
        // - Exception Management (HTTP errors)
        // - Queries
        // - Transactions
        // - Validation

        var editableAlarm;
        //////////////////////////////
        ///////// Interface //////////
        //////////////////////////////
        var dao = {
            getAllAlarms: getAllAlarms,
            getAlarm: getAlarm,
            getEditableAlarm: getEditableAlarm,
            setEditableAlarm: setEditableAlarm,
            saveAlarm: saveAlarm,
            removeAlarm: removeAlarm
        };

        return dao;

        //////////////////////////////
        /////// Implementation ///////
        //////////////////////////////
        function getAllAlarms() {
            return resource()
                .list()
                .$promise
                .then(addAll);
        }

        function getAlarm(id) {
            return resource()
                .get({id: id})
                .$promise
                .then(addOne);
        }

        function getEditableAlarm(id) {
            if (editableAlarm) {
                return $q.when(editableAlarm);
            } else {
                if (id === 'new') {
                    return $q.when(Alarm.createNewAlarm()).then(setEditableAlarm);
                } else {
                    return $q.when(getAlarm(id)).then(setEditableAlarm);
                }
            }
        }

        function setEditableAlarm(alarm) {
            editableAlarm = alarm;
            return alarm;
        }

        function saveAlarm(alarm) {
            var save = alarm.id ? updateAlarm : createAlarm;

            return validationService
                .validate(alarm, Alarm.validates)
                .then(save);
        }

        function removeAlarm(id) {
            return resource()
                .remove({id: id})
                .$promise;
        }

        //////////////////////////////
        ///////// Private ////////////
        //////////////////////////////
        function createAlarm(alarm) {
            return resource()
                .create(alarm)
                .$promise;
        }

        function updateAlarm(alarm) {
            return resource()
                .update({id: alarm.id}, alarm)
                .$promise;
        }

        function addAll(alarms) {
            alarms = alarms.map(addOne);
            return $q.all(alarms);
        }

        function addOne(alarm) {
            return $q.when(alarm)
                .then(alarmParser.parse)
                .then(Alarm.createAlarm);
        }

        function resource() {
            return $resource('api/alarms/:id', {}, {
                list: {
                    isArray: true,
                    method: 'GET'
                },
                create: {
                    method: 'POST'
                },
                update: {
                    method: 'PUT'
                },
                remove: {
                    method: 'DELETE'
                }
            });
        }
    }

}).call(this, angular);
