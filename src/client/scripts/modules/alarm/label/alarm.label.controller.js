(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmLabel', AlarmLabel);

    /* @ngInject */
    function AlarmLabel() {
        var vm = this;
        vm.title = 'Label';

        initialize();

        function initialize() {}
    }

}).call(this, angular);
