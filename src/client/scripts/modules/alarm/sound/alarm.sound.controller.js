(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmSound', AlarmSound);

    /* @ngInject */
    function AlarmSound() {
        var vm = this;
        vm.title = 'Sound';

        initialize();

        function initialize() {}
    }

}).call(this, angular);
