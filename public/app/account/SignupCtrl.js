angular.module('app').controller('SignupCtrl', function ($location, Auth, Notifier) {
    var vm = this;
    vm.signup = function () {
        var newUserData = {
            username: vm.email,
            password: vm.password,
            firstName: vm.fname,
            lastName: vm.lname
        };
        Auth.createUser(newUserData).then(function () {
            Notifier.success('User account created!');
            $location.path('/');
        }, function (reason) {
            Notifier.error(reason);
        });
    };
});