(function(angular) {
    'use strict';

    angular
        .module('clock.dao')
        .factory('alarmDao', alarmDao);

    /* @ngInject */
    function alarmDao($q, $http, Alarm) {

        var newAlarm;
        var dao = {
            list: list,
            get: get,
            getNew: getNew,
            removeNew: removeNew,
            create: create,
            update: update,
            remove: remove
        };

        return dao;

        function list() {
            var options = {
                method: 'GET',
                url: getURL()
            };
            return sync(options).then(addAll);
        }

        function get(id) {
            var options = {
                method: 'GET',
                url: getURL(id)
            };
            return sync(options).then(addOne);
        }

        function getNew() {
            if (!newAlarm) {
                newAlarm = Alarm.createNewAlarm();
            }
            return $q.when(newAlarm);
        }

        function removeNew() {
            newAlarm = null;
            return $q.when(newAlarm);
        }

        function create(data) {
            var options = {
                method: 'POST',
                url: getURL(),
                data: data
            };
            return sync(options);
        }

        function update(id, data) {
            var options = {
                method: 'PUT',
                url: getURL(id),
                data: data
            };
            return sync(options);
        }

        function remove(id) {
            var options = {
                method: 'DELETE',
                url: getURL(id)
            };
            return sync(options);
        }

        function addAll(alarms) {
            alarms = alarms.map(addOne);
            return $q.all(alarms);
        }

        function addOne(alarm) {
            return Alarm.createAlarm(alarm);
        }

        function sync(options) {
            return $http(options).then(parseResponse);
        }

        function parseResponse(res) {
            return res.data;
        }

        function getURL(id) {
            var url;
            if (id) {
                url = 'api/alarms/' + id;
            } else {
                url = 'api/alarms';
            }
            return url;
        }
    }

}).call(this, angular);
