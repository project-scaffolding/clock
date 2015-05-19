(function(angular) {
    'use strict';

    angular
        .module('clock', [
            // Angular Modules
            'ngRoute',
            'ngResource',

            // 3-rd Part modules

            // Application Modules
            'clock.alarm'

        ]);

}).call(this, angular);
