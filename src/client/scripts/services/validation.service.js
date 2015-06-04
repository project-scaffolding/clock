(function(angular, validate) {
    'use strict';

    angular
        .module('clock.services')
        .factory('validationService', validationService);

    /* @ngInject */
    function validationService($q) {

        validate.Promise = $q;

        return {
            validate: validate.async
        };
    }

}).call(this, angular, validate);
