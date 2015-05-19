(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmNew', AlarmNew);

    /* @ngInject */
    function AlarmNew() {
        var vm = this;
        vm.title = 'Alarm(New)';

        initialize();

        function initialize() {}
    }

}).call(this, angular);
