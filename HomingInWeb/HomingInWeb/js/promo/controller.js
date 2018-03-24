/* global angular */
(function () {
    "use strict";

    var app = angular.module('homingApp.promo.controllers', []);

    app.controller('promoController', ['$scope', '$http', '$location', '$rootScope',
        function ($scope, $http, $location, $rootScope) {
            $scope.premiumValueTarget = null;
            $scope.isUserLogged = $rootScope.IsLogged();

            $scope.purchaseTarget = '';
            $scope.isReady = false;

            $scope.setPurchaseTarget = function (target) {
                $scope.purchaseTarget = target;

                $('html, body').animate({
                    scrollTop: $('.prices_table').offset().top + 350
                });

            }
            $scope.onPaymentMethodReceived = function (payment) {
                var data = {
                    Nonce: payment.nonce,
                    Target: $scope.purchaseTarget
                }

                $http.post('/purchase/checkout', data)
                    .then(function (res) {
                        $scope.updateUser().then(function () {
                            $rootScope.ShowGenericMessageBox("Congratulations", "You are now a Homing In Premium Agent.", function () {
                                $location.path('/dashboard/profile');
                                $(window).scrollTop(0);
                            });
                                                       
                        });
                    }, function (err) {
                        var errorMessage = err.data.Error || err.data.ResponseStatus.Message;
                        $rootScope.ShowGenericMessageBox("Failed", errorMessage, function() { });
                    });
            }

            $scope.onBraintreeReady = function () {
                $scope.$apply(function() {
                    $scope.isReady = true;
                });
            }

            $scope.updateUser = function() {
                return $http.get('/user').then(
                    function (response) {
                        $rootScope.ApplySession(response.data.User, response.data.SessionId);
                    }
                );
            }

        }
    ]);
})();

