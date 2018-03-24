/* global angular */
(function () {
    "use strict";

    var app = angular.module('homingApp.signup.controllers', []);

    app.controller('signupController', ['$scope', '$http', "$location", "$rootScope", "$cookies",
        function ($scope, $http, $location, $rootScope, $cookies) {
            console.log("signupController Init");

            $scope.isAgent = 'homeowner';
            $scope.serviceArea = [];
            $scope.newPostalCode = "";
            $scope.agentPic = null;

            $scope.AddPostalCode = function () {
                var codes = $scope.newPostalCode.match(/\w+/g);

                if (codes && codes.length) {
                    codes.forEach(function (code) {
                        if ($scope.serviceArea.indexOf(code) < 0) {
                            $scope.serviceArea.push(code);
                        }
                    })
                }

                $scope.newPostalCode = '';
            }

            $scope.RemovePostalCode = function (code) {
                $scope.serviceArea.remByVal(code);
            }

            $scope.NotImplemented = function () {
                $rootScope.ShowGenericMessageBox("Pardon our dust", "This feature is not yet implemented.", function () {

                });
            }

            $scope.DoSignup = function () {
                //TODO: Validation
                //TODO: bring over the data loading thing
                var isAgent = $scope.isAgent == "agent";

                //TODO: Find a way to get a device id equivilant for web
                var request = {
                    'method': 'POST',
                    'url': 'user',
                    'data': {
                        'Email': $scope.email,
                        'Password': $scope.password,
                        'IsAgent': isAgent,
                        'FirstName': $scope.firstName,
                        'LastName': $scope.lastName,
                        'Company': $scope.company,
                        'PhoneNumber': $scope.phone,
                        'PostalCodes': $scope.serviceArea,
                        'AgentLicense': $scope.AgentLicense,
                        'PremiumAgentId': $cookies.get("premiumAgentId")
                    }
                };

                $http(request).then(function successCallback(response) {

                    $rootScope.ApplySession(response.data.User, response.data.SessionId);

                    $rootScope.UploadPic($scope.agentPic, response.data.User.Id).then(function (pic) {
                        $rootScope.currentUser.Picture = { URL: pic + '?decache=' + new Date().getTime() };
                        $rootScope.setUser($rootScope.currentUser)
                        $location.path("/");
                    }).catch(function () {
                        $location.path("/");
                    })

                }, function errorCallback(response) {

                    //TODO: this should not be a message box
                    //TODO: figure out how validation works in angular
                    $rootScope.ShowGenericMessageBox("Unable to create user", response.data.ResponseStatus.Message, function () {

                    });
                });
            }

            $scope.ShowServiceAreaPopup = function () {
                $('.postal-code-popup').fadeIn(200);
                $('.postal-code-popup').addClass('popup-visible');
                $('body').addClass('is-popup');
            }

            $scope.HideServiceAreaPopup = function () {
                $('.popup-body').fadeOut(200);
                $('.popup-body').removeClass('popup-visible');
                $('body').removeClass('is-popup');
                console.log($scope.serviceArea);
            }
        }
    ]);
})();

