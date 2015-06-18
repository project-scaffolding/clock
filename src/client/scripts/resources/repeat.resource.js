(function(angular) {
    'use strict';

    angular
        .module('clock.resources')
        .factory('repeatResource', repeatResourceProvider);

    /* @ngInject */
    function repeatResourceProvider($q, $resource) {
        ///////// Interface //////////
        var dao = {
            list: list
        };

        return dao;

        /////// Implementation //////
        function list() {
            return resource().list().$promise.then(function(repeats) {
                return repeats.map(parser);
            });
        }

        ///////// Private ////////////
        function resource() {
            return $resource('api/repeats/:id', {}, {
                list: {
                    isArray: true,
                    method: 'GET',
                    cache: true
                }
            });
        }

        function parser(data) {
            var mapper = {
                '_id': 'id'
            };
            var repeat = {};

            Object.keys(data).forEach(function(key) {
                var value = data[key];
                key = mapper[key] || key;
                repeat[key] = value;
            });

            return repeat;
        }
    }

}).call(this, angular);
