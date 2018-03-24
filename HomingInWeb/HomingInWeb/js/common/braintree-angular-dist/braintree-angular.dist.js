(function () {
    var braingular = window.angular.module('braintree-angular', [])

    braingular.directive('braintreeDropin', function () {
        return {
            restrict: 'AE',
            scope: {
                options: '='
            },
            template: '<div id="bt-dropin"></div>',
            controller: ['$scope', '$braintree', function ($scope, $braintree) {
                var options = $scope.options || {}
                options.container = 'bt-dropin'

                $braintree.setupDropin(options)
            }]
        }
    })

    braingular.directive('braintreePaypal', function () {
        return {
            restrict: 'AE',
            scope: {
                options: '='
            },
            template: '<div id="bt-paypal"></div>',
            controller: ['$scope', '$braintree', function ($scope, $braintree) {
                var options = $scope.options || {}
                options.container = 'bt-paypal'

                $braintree.setupPayPal(options)
            }]
        }
    })

    braingular.factory('$braintree', ['clientTokenPath', '$http', '$q', function (clientTokenPath, $http, $q) {
        var $braintree = {}

        $braintree.clientToken = null

        Object.keys(braintree).forEach(function (key) {
            $braintree[key] = braintree[key]
        })

        $braintree.getClientToken = function (params) {
            var deferred = $q.defer();
            $http({
                method: "GET",
                params: params,
                url: clientTokenPath
            })
            .success(function (result) {
                deferred.resolve(result.Token);
            })
            .error(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        $braintree.setupDropin = function (options) {
            $braintree.getClientToken()
              .then(function (token) {
                  braintree.setup(token, 'dropin', options)
              },
              function (data, status) {
                  console.error('error fetching client token at ' + clientTokenPath, data, status)
              })
        }

        $braintree.setupPayPal = function (options) {
            $braintree.getClientToken()
              .then(function (token) {
                  braintree.setup(token, 'paypal', options)
              },
              function (data, status) {
                  console.error('error fetching client token at ' + clientTokenPath, data, status)
              })
        }

        return $braintree
    }]);

})();