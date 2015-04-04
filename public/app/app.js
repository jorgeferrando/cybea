var app = angular.module('app', ['ngResource', 'ngRoute'])
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
                templateUrl: '/partials/account/signup',
                controller: 'SignupCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/users', {
                templateUrl: '/partials/admin/user-list',
                controller: 'UserListCtrl',
                controllerAs: 'vm',
                resolve: routeRoleChecks.admin
            })
        ;
    }])
    .run(function ($window, $rootScope, $location, Notifier, Identity, User) {
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            if (rejection === 'not authorized') {
                Notifier.error(rejection);
                $location.url('/');
            }
        });
        $window.app = {
            authState: function (state, userData) {
                $rootScope.$apply(function () {
                    switch (state) {
                        case 'success':
                            var user = new User();
                            angular.extend(user, userData);
                            Identity.currentUser = user;
                            Notifier.success("Logged with Facebook!");
                            break;
                        case 'failure':
                            Notifier.error("It was impossible to login with Facebook!");
                            break;
                    }

                });
            }
        };
    });
