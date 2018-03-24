(function () {
    "use strict";

    var app = angular.module('priceService', [])

    app.controller('priceCtrl', ['$scope', '$http', '$routeParams', '$cookieStore',
        function ($scope, $http, $routeParams, $cookieStore) {
            var myself = $cookieStore.get('globals')
            //resizer(1340)
            resizer(940)
            $scope.cats = ["Home Value Requests", "Basic Profile", "Expanded Profile", "Marketing Links", "Homeowner Messaging", "Personal Home Value Website", "Video Interview", "List Now", "Automated Marketing"]
            $scope.free = [true, true, false, false, false, false, false, false, false]
            $scope.premium = [true, true, true, true, true, true, false, false, false]
            $scope.elite = [true, true, true, true, true, true, true, true, true]
            $scope.myMenu = {};
            $scope.sign_up_text = "Sign Up!"
            if (myself) {
                $scope.sign_up_text = "Upgrade!"
            }
            $scope.myMenu.doClick = function (tag) {
                console.log(tag)
            }
        }
    ])

})();