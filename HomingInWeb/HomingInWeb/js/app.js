/* global angular */
(function () {
    "use strict";
    // Declare app level module which depends on filters, and services
    var module = angular.module('homingApp', [
        'ngRoute',
        'ngResource',
        'ngCookies',
        'ngFileUpload',
        'angular-loading-bar',
        'braintree-angular',
        'angular.filter',
        'homingInFilters',
        'homingInDirectives',
        'homingApp.home.controllers',
        'homingApp.search.controllers',
        'homingApp.login.controllers',
        'homingApp.signup.controllers',
        'homingApp.dashboard.controllers',
        'homingApp.passwords.controllers',
        'homingApp.promo.controllers',
        'homingApp.create_estimate.controllers',
        'homingApp.anonymous_view.controllers',
        'homingApp.messages.controllers',
        'navigation.controllers',
    ]);

    //TODO: JWM - You are going to want this at some point
    /*
    $scope.$watch(function() { return $location.path(); }, function(newValue, oldValue){  
    if ($scope.loggedIn == false && newValue != '/login'){  
            $location.path('/login');  
    }  
});
    */
    module.constant('clientTokenPath', '/purchase/token');

    module.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', { templateUrl: '/partials/home/index.html', controller: 'homeController' });
        $routeProvider.when('/u/:premiumAgentId', { templateUrl: '/partials/home/index.html', controller: 'homeController' });
        $routeProvider.when('/search/:address', { templateUrl: '/partials/search/index.html', controller: 'searchController' });
        $routeProvider.when('/create_estimate', { templateUrl: '/partials/create_estimate/index.html', controller: 'createEstimateController' });
        $routeProvider.when('/login', { templateUrl: '/partials/login/index.html', controller: 'loginController' });
        $routeProvider.when('/signup', { templateUrl: '/partials/signup/index.html', controller: 'signupController' });
        $routeProvider.when('/dashboard/profile', { templateUrl: '/partials/dashboard/profile.html', controller: 'profileController' });
        $routeProvider.when('/dashboard/properties', { templateUrl: '/partials/dashboard/properties.html', controller: 'propertiesController' });
        $routeProvider.when('/dashboard/properties/:estimateId', { templateUrl: '/partials/dashboard/property-details.html', controller: 'propertyDetailsController' });
        $routeProvider.when('/dashboard/properties/:estimateId/response/:responseId', { templateUrl: '/partials/dashboard/response-details.html', controller: 'propertyDetailsController' });
        $routeProvider.when('/dashboard/messages', { templateUrl: '/partials/dashboard/messages.html', controller: 'messagesController' })

        $routeProvider.when('/valuations/:anonymousValuationId', { templateUrl: '/partials/anonymous_view/anonymous_view_property.html', controller: 'anonymousViewController' });
        $routeProvider.when('/valuations/:anonymousValuationId/response/:responseId', { templateUrl: '/partials/dashboard/response-details.html', controller: 'anonymousViewController' });
        $routeProvider.when('/unsub/:anonymousValuationId', { templateUrl: '/partials/anonymous_view/unsub.html', controller: 'unsubController' });
        $routeProvider.when('/homeowners', { templateUrl: '/partials/homeowners/index.html', controller: 'promoController' });
        $routeProvider.when('/agents', { templateUrl: '/partials/agents/index.html', controller: 'promoController' });
        $routeProvider.when('/pricing', { templateUrl: '/partials/pricing/index.html', controller: 'promoController' });
        $routeProvider.when('/refunds', { templateUrl: '/partials/refunds/index.html', controller: 'promoController' });
        $routeProvider.when('/terms', { templateUrl: '/partials/terms/index.html', controller: 'promoController' });
        $routeProvider.when('/privacypolicy', { templateUrl: '/partials/privacypolicy/index.html', controller: 'promoController' });
        $routeProvider.when('/promo', { templateUrl: '/partials/promo/index.html', controller: 'promoController' });

        $routeProvider.when('/forgotPassword', { templateUrl: '/partials/password_reset/reset_start.html', controller: 'forgotPasswordController' });
        $routeProvider.when('/ResetPassword', { templateUrl: '/partials/password_reset/reset.html', controller: 'passwordController' });
        $routeProvider.when('/ResetPassword/:uid/:uiniqueId', { templateUrl: '/partials/password_reset/reset.html', controller: 'passwordController' });

        $routeProvider.when('/404', { templateUrl: '/partials/404.html' });
        $routeProvider.otherwise({ redirectTo: '/404' });

        //http://dev.homingin.co/valuations/de9620da-5092-4185-9452-ef5bb31f413e

        $locationProvider.html5Mode(true);
    }]);

    module.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }])

    module.run(['$rootScope', '$cookies', '$http', '$window', '$q', 'Upload', '$location', 
        function ($rootScope, $cookies, $http, $window, $q, Upload, $location) {

            $rootScope.forceSSL = function () {
                if ($location.protocol() !== 'https') {
                    $window.location.href = $location.absUrl().replace('http', 'https');
                }
            };

            $rootScope.forceSSL();

            $rootScope.IsAndroid = navigator.userAgent.match(/Android/i);
            $rootScope.IsIOS = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i);
            $rootScope.AndroidUrl = "https://play.google.com/store/apps/details?id=homingin.com.homingin";
            $rootScope.IOSUrl = "https://itunes.apple.com/us/app/homing-in-whats-my-home-worth/id527025526?mt=8";

            $rootScope.GenericMessageCloseCallback = null;
            

            $rootScope.ShowGenericMessageBox = function (title, message, onClose) {
                $('#genericMessageBoxPopup.popup-body').fadeIn(200);
                $('#genericMessageBoxPopup.popup-body').addClass('popup-visible');
                $('body').addClass('is-popup');


                $('#genericMessageBoxPopupTitle').text(title);
                $('#genericMessageBoxPopupMessage').html(message);

                $rootScope.GenericMessageCloseCallback = onClose;
            }

            $rootScope.HideGenericMessageBox = function () {
                $('#genericMessageBoxPopup.popup-body').fadeOut(200);
                $('#genericMessageBoxPopup.popup-body').removeClass('popup-visible');
                $('body').removeClass('is-popup');

                if ($rootScope.GenericMessageCloseCallback != null) {
                    $rootScope.GenericMessageCloseCallback();
                    $rootScope.GenericMessageCloseCallback = null;
                }
            }

            $rootScope.GetAnonymousSessionIfNeeded = function () {
                if ($rootScope.deviceId == null || $rootScope.sessionId != null) return;

                var request = {
                    'method': 'GET',
                    'url': '/user/anonymous/' + $rootScope.deviceId,
                };
                $http(request).then(function successCallback(response) {
                    $rootScope.ApplySession(response.data.User, response.data.SessionId);
                }, function errorCallback(response) {
                    console.log("Unable to get an anonymous session...");
                });
            };

            $rootScope.deviceId = $cookies.get("hi-deviceid");
            if ($rootScope.deviceId == null) {

                var request = {
                    'method': 'GET',
                    'url': '/guid'
                };
                $http(request).then(function successCallback(response) {
                    var guid = response.data.Guid;
                    $rootScope.deviceId = guid;

                    var now = new Date();
                    $cookies.put('hi-deviceid', guid, {
                        expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
                    });
                    $rootScope.GetAnonymousSessionIfNeeded();
                }, function errorCallback(response) {
                    console.log("Unable to retreive device guid...");
                });
            }

            if ($rootScope.currentUser == null) {
                $rootScope.currentUser = $cookies.getObject("hi-user");
                $rootScope.sessionId = $cookies.get("hi-session");

                $rootScope.GetAnonymousSessionIfNeeded();
            }

            $rootScope.ValidateEmail = function (email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }

            $rootScope.ApplySession = function (user, sessionId) {
                $rootScope.currentUser = user;
                $rootScope.sessionId = sessionId;
                $cookies.putObject("hi-user", user);
                $cookies.put("hi-session", sessionId);
            }

            $rootScope.setUser = function (user) {
                $cookies.putObject("hi-user", user);
            }

            $rootScope.LogOut = function () {
                $cookies.remove("hi-user");
                $cookies.remove("hi-session");
                $rootScope.currentUser = null;
                $rootScope.sessionId = null;

                $window.location.href = "/";
                $window.location.reload();
            }

            $rootScope.IsLogged = function () {
                return $rootScope.currentUser && $rootScope.currentUser.FirstName !== 'Anonymous' && $rootScope.currentUser.LastName !== 'Anonymous';
            }

            $rootScope.UploadPic = function (file, userId) {
                var deferred = $q.defer();

                if (file && userId) {
                    Upload.dataUrl(file, true).then(function (dataUrl) {
                        $http({
                            method: 'POST',
                            url: 'user/' + userId + '/picture',
                            data: {
                                UserId: userId,
                                PictureType: 'Profile',
                                Base64Picture: dataUrl
                            }
                        }).then(function (resp) {
                            deferred.resolve(resp.data.PictureURL);
                        }, function (resp) {
                            deferred.reject(resp);
                        })
                    })
                } else {
                    deferred.reject('Missed file or userId');
                }

                return deferred.promise;
            }

            $rootScope.ShowPopup = function (selector) {
                $(selector).fadeIn(200).addClass('popup-visible');
                $('body').addClass('is-popup');
            }

            $rootScope.HidePopup = function (selector) {
                $(selector).fadeOut(200).removeClass('popup-visible');
                $('body').removeClass('is-popup');
            }

            $rootScope.NewConversation = null;

            $rootScope.$on('$routeChangeStart', function () {
                //Hide modal if route change
                $rootScope.HideGenericMessageBox();
            });
        }
    ]);

})();


Array.prototype.remByVal = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}

