/* global angular */
(function () {
    "use strict";

    var app = angular.module('homingApp.login.controllers', []);

    app.controller('loginController', ['$scope', '$http', '$location', '$rootScope',
        function ($scope, $http, $location, $rootScope) {
            console.log("loginController Init");

            $scope.DoLogin = function () {
                var loginButton = document.getElementById("loginButton");

                $scope.dataLoading = true;

                var email = $scope.email;
                var password = $scope.password;

                //TODO: Find a way to get a device id equivilant for web
                var request = {
                    'method': 'POST',
                    'url': 'user/login',
                    'data': {
                        'Email': email,
                        'Password': password,
                        'DeviceId': 'this-needs-to-be-figured-out'
                    }
                };

                $http(request).then(function successCallback(response) {
                    $rootScope.ApplySession(response.data.User, response.data.SessionId);
                    $location.path("/dashboard/properties");
                }, function errorCallback(response) {

                    //TODO: this should not be a message box
                    //TODO: figure out how validation works in angular
                    $rootScope.ShowGenericMessageBox("Unable to log in", response.data.ResponseStatus.Message, function () {

                    });
                });

                $scope.dataLoading = false;
            }
        }
    ]);
})();

