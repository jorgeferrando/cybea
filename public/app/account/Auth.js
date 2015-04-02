angular.module('app').factory('Auth', function ($http, Identity, $q) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {
                username: username,
                password: password
            }).then(function (response) {
                if (response.data.success) {
                    Identity.currentUser = response.data.user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                Identity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        }
    }
});
