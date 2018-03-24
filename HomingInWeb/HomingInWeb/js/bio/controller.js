(function () {
    "use strict";

    var app = angular.module('bioService', [])

    app.controller('bioCtrl', ['$scope', '$http', '$routeParams', '$cookieStore',
        function ($scope, $http, $routeParams, $cookieStore) {
            var myself = $cookieStore.get('globals')
            $scope.FName = myself.currentUser.response.User.FirstName
            $scope.LName = myself.currentUser.response.User.LastName
            $scope.Email = myself.currentUser.response.User.Email
            $scope.IsAgent = myself.currentUser.response.User.IsAgent
            resizer(0)
        }
    ])

})();

