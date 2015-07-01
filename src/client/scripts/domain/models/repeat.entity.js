(function(angular) {
    'use strict';

    angular
        .module('clock.domain')
        .factory('RepeatEntity', RepeatEntityProvider);

    /* @ngInject */
    function RepeatEntityProvider($q) {

        function RepeatEntity() {
            this.id = null;
            this.name = '';
            this.weekDay = null;
            this.active = false;
        }

        RepeatEntity.createRepeat = function(obj) {
            var repeat = new RepeatEntity();
            repeat.id = obj.id;
            repeat.name = obj.name;
            repeat.weekDay = obj.weekDay;

            return $q.when(repeat);
        };

        return RepeatEntity;

    }

}).call(this, angular);
