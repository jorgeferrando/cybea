angular.module('app', ['ngResource', 'ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        var routeRoleChecks = {
            admin: {
                auth: function (Auth) {
                    return Auth.authorizeCurrentUserForRoute('admin');
                }
            }
        };

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main/main'
                , controller: 'MainCtrl'
                , controllerAs: 'vm'
            })
            .when('/signup', {
                controller: 'SignupCtrl'
            })
            .when('/admin/users', {
                templateUrl: '/partials/admin/user-list',
                controller: 'UserListCtrl',
                controllerAs: 'vm',
                resolve: routeRoleChecks.admin
            })
        ;
    }])
    .run(function ($rootScope, $location, Notifier) {
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            if (rejection === 'not authorized') {
                Notifier.error(rejection);
                $location.url('/');
            }
        });
    });
