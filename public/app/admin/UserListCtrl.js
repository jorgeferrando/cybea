angular.module('app').controller('UserListCtrl', function (User) {
    var vm = this;
    vm.users = User.query();
});
