(function(angular) {
    'use strict';

    angular
        .module('clock.services')
        .factory('validateService', validateService);

    /* @ngInject */
    function validateService($q, validate) {

        validate.Promise = $q;

        return {
            validate: validate.async
        };

    }

}).call(this, angular);
