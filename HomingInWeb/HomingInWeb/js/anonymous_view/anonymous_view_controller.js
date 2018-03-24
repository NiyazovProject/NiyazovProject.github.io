/* global angular */
(function () {
    "use strict";

    var app = angular.module('homingApp.anonymous_view.controllers', []);

    app.controller('anonymousViewController', ['$scope', '$http', '$location', '$rootScope', '$routeParams',
        function ($scope, $http, $location, $rootScope, $routeParams) {
            console.log("anonymousViewController Init");

            $scope.anonymousValuationId = $routeParams.anonymousValuationId;
            $scope.responseId = $routeParams.responseId;
            $scope.isAnonymousValuation = null;

            //TODO: the most basic of validation


            var request = {
                'method': 'GET',
                'url': '/estimates/anonymous/' + $scope.anonymousValuationId
            };
            $http(request).then(function successCallback(response) {
                $scope.estimate = response.data.Estimate;
                $scope.agentCount = response.data.Estimate.Responses.length;
                $scope.averagePrice = "Pending";

                var totalPrice = 0;
                for(var i = 0; i < $scope.estimate.Responses.length; i++)
                {
                    var response = $scope.estimate.Responses[i];
                    totalPrice += response.EstimateValue;

                    var dateInt = parseInt(response.CreatedOn.substr(6, response.CreatedOn.lastIndexOf('/')))
                    response.CreatedOn = new Date(dateInt);

                    if (response.User.Picture != null) {
                        console.log(response.User.Picture.URL);
                        response.pictureUrl = response.User.Picture.URL;
                    }
                }

                if (totalPrice > 0) {
                    $scope.averagePrice = totalPrice / $scope.agentCount;
                }

                if ($scope.responseId) {
                    $scope.response = $scope.estimate.Responses.filter(function (item) {
                        return item.Id == $scope.responseId;
                    })[0];
                }

            }, function errorCallback(response) {
                $rootScope.ShowGenericMessageBox("There was a problem locating this valuation", response.data.ResponseStatus.Message, function () {
                });
            });

            $scope.getIsAnonymous = function () {
                $http.get('/estimates/isanonymous/' + $scope.anonymousValuationId).then(function (response) {
                    $scope.isAnonymousValuation = response.data.IsAnonymous;
                })
            }
            

            $scope.showResponse = function (response) {
                var estimateId = $scope.estimate.Id;
                var detailsUrl = '/valuations/' + $scope.anonymousValuationId + '/response/' + response.Id;
                console.log(detailsUrl);
                $location.path(detailsUrl);
            }

            $scope.ClaimPage = function () {
                $http.post('/estimates/claim/' + $scope.anonymousValuationId).then(function (response) {
                    $scope.isAnonymousValuation = false;
                });
            }

            if ($rootScope.IsLogged()) {
                $scope.getIsAnonymous();
            }
        }
    ]);

    app.controller('unsubController', ['$scope', '$http', '$location', '$rootScope', '$routeParams',
        function ($scope, $http, $location, $rootScope, $routeParams) {
            console.log("unsubController Init");
            $scope.anonymousValuationId = $routeParams.anonymousValuationId;

            var request = {
                'method': 'GET',
                'url': '/estimates/anonymous/' + $scope.anonymousValuationId + "/unsub"
            };
            $http(request).then(function successCallback(response) {
                console.log("Unsubbed successfully...");
            }, function errorCallback(response) {
                console.log("Could not unsub...");
            });
        }
    ]);
})();

