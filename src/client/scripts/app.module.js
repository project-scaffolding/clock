(function(angular) {
    'use strict';

    angular
        .module('clock', [
            // Angular Modules
            'ngRoute',
            'ngResource',

            // 3-rd Part modules

            // Application Modules
            'clock.services',
            'clock.alarm'

        ]);

}).call(this, angular);
