(function(angular) {
    'use strict';

    angular
        .module('clock.resource')
        .factory('alarmResource', alarmResourceProvider);

    /* @ngInject */
    function alarmResourceProvider($q, $resource, alarmParser) {
        // Data Layer Frame
        // - Exception Management (HTTP errors)
        // - Queries
        // - Transactions
        // - Validation

        ///////// Interface //////////
        var dao = {
            list: list,
            get: get,
            create: create,
            update: update,
            remove: remove
        };

        return dao;

        /////// Implementation //////
        function list() {
            return resource().list().$promise.then(function(alarms) {
                return alarms.map(alarmParser.parse);
            });
        }

        function get(id) {
            return resource().get({id: id}).$promise.then(alarmParser.parse);
        }

        function create(alarm) {
            return resource().create(alarm).$promise;
        }

        function update(alarm) {
            return resource().update({id: alarm.id}, alarm).$promise;
        }

        function remove(id) {
            resource().remove({id: id}).$promise;
        }

        ///////// Private ////////////
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
