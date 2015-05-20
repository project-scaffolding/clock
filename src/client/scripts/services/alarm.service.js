(function(angular) {
    'use strict';

    angular
        .module('clock.services')
        .factory('alarmService', alarmService);

    /* @ngInject */
    function alarmService($http) {

        ///////////// Interface /////////////

        var service = {
            getAlarms: getAlarms,
            getAlarm: getAlarm,
            getNewAlarm: getNewAlarm,
            getEditAlarm: getEditAlarm,
        };

        return service;

        ////////// Implementation //////////

        function getAlarms() {
            return $http.get('api/alarms').then(function(res) {
                return res.data;
            });
        }

        function getAlarm(id) {
            return $http.get('api/alarms/' + id).then(function(res) {
                return res.data;
            });
        }

        function getNewAlarm() {

        }

        function getEditAlarm() {

        }
    }

}).call(this, angular);
