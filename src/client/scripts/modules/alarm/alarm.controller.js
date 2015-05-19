(function(angular) {
    'use strict';

    angular
        .module('clock.alarm')
        .controller('Alarms', Alarms);

    /* @ngIngect */
    function Alarms() {
        var vm = this;
        vm.title = 'Alarms';
    }

}).call(this, angular);
