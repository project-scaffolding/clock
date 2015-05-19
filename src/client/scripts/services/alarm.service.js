(function(angular) {
    'use strict';

    angular
        .module('clock.services')
        .factory('alarmService', alarmService);

    /* @ngInject */
    function alarmService($http) {
        var api = {
            getAlarms: getAlarms
        };

        return api;

        function getAlarms() {
            return $http.get('api/alarms').then(function(res) {
                return res.data;
            });
        }
    }

}).call(this, angular);
