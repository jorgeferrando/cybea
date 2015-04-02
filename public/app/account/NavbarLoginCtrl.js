angular.module('app')
    .controller('NavbarLoginCtrl', function ($http, $location, Notifier, Identity, Auth) {
        var vm = this;
        vm.identity = Identity;
        vm.signin = function (username, password) {
            username = username || "";
            password = password || "";
            Auth.authenticateUser(username, password).then(function (success) {
                if (success) {
                    Notifier.success('You have successfully signed in!');
                } else {
                    Notifier.error('Username/Password combination incorrect');
                }
            });
        };
        vm.signout = function () {
            Auth.logoutUser().then(function () {
                vm.username = "";
                vm.password = "";
                Notifier.success("You have successfully signed out!");
                $location.path("/");
            });
        };
    });
