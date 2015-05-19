(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmEdit', AlarmEdit);

    /* @ngInject */
    function AlarmEdit() {
        var vm = this;
        vm.title = 'Alarm(Edit)';

        initialize();

        function initialize() {}
    }

}).call(this, angular);
