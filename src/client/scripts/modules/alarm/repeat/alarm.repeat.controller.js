(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('AlarmRepeat', AlarmRepeat);

    /* @ngInject */
    function AlarmRepeat() {
        var vm = this;
        vm.title = 'Repeat';

        initialize();

        function initialize() {}
    }

}).call(this, angular);
