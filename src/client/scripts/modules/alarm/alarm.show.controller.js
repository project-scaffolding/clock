(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmShow', AlarmShow);

    /* @ngInject */
    function AlarmShow() {
        var vm = this;
        vm.title = 'Alarm(Show)';

        initialize();

        function initialize() {}
    }

}).call(this, angular);
