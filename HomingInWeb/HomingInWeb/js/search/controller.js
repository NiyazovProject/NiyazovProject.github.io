/* global angular */
(function () {
    "use strict";

    var app = angular.module('homingApp.search.controllers', []);

    app.controller('searchController', ['$scope', '$http', '$routeParams', '$sce', '$location', '$rootScope', '$cookies',
    function ($scope, $http, $routeParams, $sce, $location, $rootScope, $cookies) {
            console.log("SearchController Init");

            $scope.rawAddress = $routeParams.address;
            $scope.address = $scope.rawAddress.replace(/\-/g, " ");

            var request = {
                'method': 'GET',
                'url': "https://maps.googleapis.com/maps/api/geocode/json?address=" + $scope.rawAddress + "&sensor=true_or_false"
            };

            $http(request).then(function successCallback(response) {
                //TODO: https://developers.google.com/maps/documentation/geocoding/intro#GeocodingResponses
                //read that URL and do something with the status code

                var results = [];
                for (var i = 0; i < response.data.results.length; i++) {
                    console.log(response.data.results[i].formatted_address)

                    var embedUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDHiTjd5b7mdzj3IaZ2qvYnMUc5cayTanc&q=place_id:" + response.data.results[i].place_id;
                    var imageUrl = "https://maps.googleapis.com/maps/api/streetview?size=640x640&key=AIzaSyDHiTjd5b7mdzj3IaZ2qvYnMUc5cayTanc&location=" + encodeURIComponent(response.data.results[i].formatted_address);
                    var result = {
                        "address": response.data.results[i].formatted_address,
                        "addressComponents": response.data.results[i].address_components,
                        "mapEmbedUrl": $sce.trustAsResourceUrl(embedUrl),
                        "imageUrl": imageUrl
                    };

                    results.push(result);
                }

                $scope.searchResults = results;

            }, function errorCallback(response) {

                //TODO: this should not be a message box
                //TODO: figure out how validation works in angular
                $rootScope.ShowGenericMessageBox("Error", "There was a problem searching.", function () {
                    $location.path("/");
                });
            });

            $scope.SelectAddress = function (selectedAddress) {
                $rootScope.selectedProperty = selectedAddress;
                $location.path("/create_estimate");
            };

            $scope.goBack = function () {
                var premiumAgentId = $cookies.get('premiumAgentId');
                if (premiumAgentId) {
                    $location.path("/u/" + premiumAgentId);
                } else {
                    $location.path("/");
                }
            }

        }
    ]);
})();

