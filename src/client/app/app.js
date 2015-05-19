'use strict';

angular
    .module('app.core', [])
    .controller('Dashboard', Dashboard);

/* @ngIngect */
function Dashboard($scope) {
    $scope.title = 'Dashboard';
}
