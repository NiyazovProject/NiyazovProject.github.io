/* global angular */
(function () {
    "use strict";

    var app = angular.module('homingApp.home.controllers', []);

    app.controller('homeController', ['$scope', '$http', "$location", '$rootScope', '$routeParams', '$cookies',
        function ($scope, $http, $location, $rootScope, $routeParams, $cookies) {
            console.log("homeController Init");

            console.log("User = ", $rootScope.currentUser);

            if ($routeParams.premiumAgentId) {
                console.log('Set PremiumAgentId = ' + $routeParams.premiumAgentId);
                $cookies.put("premiumAgentId", $routeParams.premiumAgentId);
            } else {
                $cookies.remove("premiumAgentId");
            }

            $scope.googleAddressChanged = function () {
                var redirectUrl = "/search/" + $scope.address;
                $location.path(redirectUrl);
            }
        }
    ]);
})();
