angular.module('app', ['ngResource', 'ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main'
                , controller: 'MainCtrl'
                , controllerAs: 'vm'
            });
    }])
;