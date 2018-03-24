(function () {
    "use strict";

    var app = angular.module('homeService', ['ngResource'])

    app.controller('homingCtrl', ['$scope', '$http', '$routeParams', '$cookieStore',
        function ($scope, $http, $routeParams, $cookieStore) {
            console.log($routeParams)
            $scope.example = {
                text: ''
            };

            var userExits = getAgent($routeParams.uid)
            //console.log(userExits)
            if (userExits) {
                $cookieStore.put('agentUid', $routeParams.uid);
                $scope.agent_name = userExits[0]
                $scope.agent_phone = userExits[1]
                $scope.agent_email = userExits[2]
            }
            //$scope.myData = {};
            //$scope.myData.doClick = function() {
            //    $scope.example.text = submitAction()
            //}
            resizer(0)
            initAutocomplete()
        }
    ])
    

})();