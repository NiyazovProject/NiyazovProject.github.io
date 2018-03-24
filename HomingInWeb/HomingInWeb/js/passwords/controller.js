/* global angular */
(function () {
    "use strict";

    var app = angular.module('homingApp.passwords.controllers', []);

    app.controller('passwordController', ['$scope', '$http', "$location", '$rootScope', '$routeParams',
        function ($scope, $http, $location, $rootScope, $routeParams) {
            console.log("passwordController Init");

            $scope.uid = $routeParams.uid;
            $scope.uiniqueId = $routeParams.uiniqueId;

            if ($scope.uiniqueId == null)
            {
                $location.path("/");
                return;
            }

            $scope.performReset = function () {
                var url = "/user/" + $scope.uid + "/complete_password_reset";

                var request = {
                    'method': 'POST',
                    'url': url,
                    'data': {
                        "UniqueId": $scope.uiniqueId,
                        "NewPassword": $scope.newPassword
                    }
                };

                $http(request).then(function successCallback(response) {
                    $rootScope.ShowGenericMessageBox("Password Reset", "The password has been updated.", function () {
                        $location.path("/");
                    });
                }, function errorCallback(response) {
                    $rootScope.ShowGenericMessageBox("Unable to reset password", "There was a problem resetting the password.  Please contact support.", function () {
                    });
                });
            }
        }
    ]);

    app.controller('forgotPasswordController', ['$scope', '$http', "$location", '$rootScope', '$routeParams',
    function ($scope, $http, $location, $rootScope, $routeParams) {
        console.log("forgotPasswordController Init");

        $scope.initiateReset = function () {
            var url = "/user/reset_password";

            var request = {
                'method': 'POST',
                'url': url,
                'data': {
                    "Email": $scope.email,
                }
            };

            $http(request).then(function successCallback(response) {
                $rootScope.ShowGenericMessageBox("Password Reset Initiated", "A link has been generated and sent to the email specified to begin the password reset process.", function () {
                    $location.path("/");
                });
            }, function errorCallback(response) {
                console.log('Reset failed: ' + response);
                $rootScope.ShowGenericMessageBox("Unable to begin reset process", "There was a problem initiating the password reset process.  Please verify the Email address provided.", function () {
                });
            });
        }
    }
    ]);

})();

























