(function(angular) {
    'use strict';

    angular
        .module('clock.resource')
        .factory('alarmParser', alarmParser);

    /* @ngInject */
    function alarmParser() {

        ///////// Interface //////////
        var parser = {
            parse: parse
        };

        return parser;

        /////// Implementation //////
        function parse(data) {
            var mapper = {
                '_id': 'id'
            };
            var alarm = {};

            Object.keys(data).forEach(function(key) {
                var value = data[key];
                key = mapper[key] || key;
                alarm[key] = value;
            });

            return alarm;
        }
    }

}).call(this, angular);
