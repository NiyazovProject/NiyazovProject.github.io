/* global angular */
(function () {
    "use strict";

    var app = angular.module('homingApp.dashboard.controllers', []);

    //SIDEBAR CONTROLLER
    ///////////////////////////////////////////
    app.controller('sidebarController', ['$scope', '$http', "$location", '$rootScope',
        function ($scope, $http, $location, $rootScope) {
            console.log("sidebarController Init");

            var url = $location.url();
            $scope.currentPage = url.substr(url.lastIndexOf('/') + 1);

            $scope.propertiesLabel = "My Properties";
            if ($rootScope.currentUser && $rootScope.currentUser.IsAgent)
                $scope.propertiesLabel = "Pending Estimates";

            $scope.Logout = function () {
                console.log("Logging out...");
                $rootScope.LogOut();
                $location.path("/");
            }

            $scope.OpenMenuMessage = function () {
                if ($rootScope.currentUser.IsAgent && !$rootScope.currentUser.IsPremium) {
                    $rootScope.ShowGenericMessageBox(
                        "Premium Feature!",
                        "Sending messages to homeowners is a Premium Feature.<br><a href=\"/pricing\">Click here</a> to find out about becoming a Premium Agent"
                    );
                } else {
                    $location.path('/dashboard/messages');
                }
            }
        }
    ]);

    //PROFILE CONTROLLER
    ///////////////////////////////////////////
    app.controller('profileController', ['$scope', '$http', "$location", '$rootScope',
        function ($scope, $http, $location, $rootScope) {
            console.log("profileController Init");

            $scope.password = "";
            $scope.confirmationPassword = "";
            $scope.agentPic = null;
            $scope.premiumAgentIdError = '';

            $scope.userOriginal = angular.copy($rootScope.currentUser);

            //TODO: there is probably a common way to force a logged in user
            if ($rootScope.currentUser == null) {
                $location.path("/");
                return;
            }

            $http.get('/user').then(function(res) {
                $rootScope.ApplySession(res.data.User, res.data.SessionId);
            })

            $scope.AddPostalCode = function () {
                var codes = $scope.newPostalCode.match(/\w+/g);

                if (codes && codes.length) {
                    codes.forEach(function (code) {
                        if ($rootScope.currentUser.PostalCodes.indexOf(code) < 0) {
                            $rootScope.currentUser.PostalCodes.push(code);
                            $scope.savePostal(code);
                        }
                    })
                }

                $scope.newPostalCode = '';
            }

            $scope.RemovePostalCode = function (code) {
                $rootScope.currentUser.PostalCodes.remByVal(code);
                $scope.savePostal(code, true);
            }

            $scope.SaveProfile = function () {
                var password = $scope.newPassword;
                var confirm = $scope.confirmationPassword;
                if ( password != null && password != undefined && password.length > 0 && password.localeCompare(confirm) != 0) {
                    $rootScope.ShowGenericMessageBox("Invalid Password", "The provided passwords do not match.", function () {

                    });
                    return;
                }

                var user = $rootScope.currentUser;

                var data = {
                    'Email': user.Email,
                    'FirstName': user.FirstName,
                    'LastName': user.LastName,
                    'Company': user.Company,
                    'PhoneNumber': user.PhoneNumber,
                    'PostalCodes': user.PostalCodes,
                    'CanReceiveEmail': user.CanReceiveEmail,
                    'PremiumInfo': user.PremiumInfo,
                    'AgentLicense': user.AgentLicense
                };

                if (password != null && password != undefined && password.length > 0) {
                    data.Password = password;
                }

                var request = {
                    'method': 'POST',
                    'headers': { 'HI_SESSION': $rootScope.sessionId },
                    'url': 'user/' + user.Id,
                    'data': data,
                };

                $http(request).then(function successCallback(response) {
                    $rootScope.setUser(response.data.User);
                    $rootScope.currentUser = response.data.User;
                    $rootScope.ShowGenericMessageBox("Update Complete", "User was successfully updated.", function () {

                    });
                }, function errorCallback(response) {

                    //TODO: this should not be a message box
                    //TODO: figure out how validation works in angular
                    $rootScope.ShowGenericMessageBox("Unable to update user", response.data.ResponseStatus.Message, function () {

                    });
                });
            }

            $scope.savePostal = function (postalCode, action) {

                var user = $rootScope.currentUser;
                var data = {
                    'UserId': user.Id,
                    'PostalCode': postalCode
                };

                var request = {
                    'method': action ? 'DELETE' : 'PUT',
                    'headers': { 'HI_SESSION': $rootScope.sessionId, 'Content-Type': 'application/json;charset=UTF-8'},
                    'url': 'user/' + user.Id + '/postal_code',
                    'data': data,
                };

                $http(request).then(function successCallback(response) {
                    $rootScope.setUser(response.data.User);
                }, function errorCallback(response) {

                    //TODO: this should not be a message box
                    //TODO: figure out how validation works in angular
                    $rootScope.ShowGenericMessageBox("Unable to update user", response.data.ResponseStatus.Message, function () {

                    });
                });
            }

            $scope.SelectPicture = function (file) {
                $rootScope.UploadPic($scope.agentPic, $rootScope.currentUser.Id).then(function (pic) {
                    $rootScope.currentUser.Picture = { URL: pic + '?decache=' + new Date().getTime() };
                    $rootScope.setUser($rootScope.currentUser)
                })
            }

            $scope.UpdatePremiumAgentId = function () {
                $scope.premiumAgentIdError = '';

                var user = $rootScope.currentUser;

                var data = {
                    'UserId': user.Id,
                    'PremiumAgentId': user.PremiumAgentId
                };

                var request = {
                    'method': 'PUT',
                    'headers': { 'HI_SESSION': $rootScope.sessionId, 'Content-Type': 'application/json;charset=UTF-8' },
                    'url': 'user/' + user.Id + '/premium_agent_id',
                    'data': data
                };

                $http(request).then(function () {
                    $rootScope.setUser($rootScope.currentUser);
                    $scope.premiumAgentForm.id.$setPristine();
                    console.log('PremiumAgentId changed');
                }, function(err) {
                    $scope.premiumAgentIdError = err.data.ResponseStatus.Message;
                });
            }

            $scope.CopyPremiumAgentIdToClipboard = function() {
                var text = 'https://homingin.co/u/' + $scope.currentUser.PremiumAgentId;

                window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
            }

            $scope.CancelSubscription = function () {
                $scope.ShowGenericConfirmBox('Confirmation', 'Are you sure, you want cancel subscription?<br>Your premium will not cancel until expiration date', function(e) {
                    var request = {
                        'method': 'POST',
                        'headers': { 'HI_SESSION': $rootScope.sessionId },
                        'url': '/purchase/cancelsubscription'
                    };

                    $http(request)
                        .then(function (response) {
                            $rootScope.currentUser.IsHasSubscription = false;
                            $rootScope.setUser($rootScope.currentUser);

                            $scope.ShowGenericMessageBox('Completed', 'You have successfully unsubscribed', function () { });

                        }, function(err) {
                            var errorMessage = err.data.Error || err.data.ResponseStatus.Message;
                            $rootScope.ShowGenericMessageBox("Failed", errorMessage, function () { });
                        });
                });
            }
        }
    ]);


    //PROPERTIES CONTROLLER
    ///////////////////////////////////////////
    app.controller('propertiesController', ['$scope', '$http', "$location", '$rootScope',
        function ($scope, $http, $location, $rootScope) {
            console.log("propertiesController Init");

            //TODO: there is probably a common way to force a logged in user
            if ($rootScope.currentUser == null) {
                $location.path("/");
                return;
            }

            var request = {
                'method': 'GET',
                'headers': { 'HI_SESSION': $rootScope.sessionId },
                'url': '/estimates/pending/' + $rootScope.currentUser.Id,
            };

            if (!$rootScope.currentUser.IsAgent)
                request.url = "/user/" + $rootScope.currentUser.Id + "/estimates";

            $scope.pageSize = 15;

            $http(request).then(function successCallback(response) {

                var estimates = response.data.Estimates;
                estimates.forEach(function (e, i) {
                    var dateInt = parseInt(e.CreatedOn.substr(6, e.CreatedOn.lastIndexOf('/')))
                    e.CreatedOn = new Date(dateInt);

                    if( e.Responses.length > 0 ) 
                        e.MyValuation = e.Responses[0].EstimateValue;


                    e.agentCount = e.Responses.length;

                    var totalPrice = 0;
                    for (var i = 0; i < e.Responses.length; i++) {
                        var response = e.Responses[i];
                        totalPrice += response.EstimateValue;
                    }

                    if (totalPrice > 0) {
                        e.averagePrice = totalPrice / e.agentCount;
                    }
                });

                $scope.estimates = response.data.Estimates;
            }, function errorCallback(response) {

                //TODO: this should not be a message box
                //TODO: figure out how validation works in angular
                $rootScope.ShowGenericMessageBox("Unable to retreive properties", response.data.ResponseStatus.Message, function () {

                });
            });

            $scope.RowClick = function (estimate) {
                var detailsUrl = '/dashboard/properties/' + estimate.Id;
                $location.path(detailsUrl);
            };
        }
    ]);



    //PROPERTY DETAILS CONTROLLER
    ///////////////////////////////////////////
    app.controller('propertyDetailsController', ['$scope', '$http', "$location", '$rootScope', '$routeParams',
        function ($scope, $http, $location, $rootScope, $routeParams) {
            console.log("propertyDetailsController Init");

            //pull the estimate id
            var estimateId = $routeParams.estimateId;
            var responseId = $routeParams.responseId;
            $scope.submitLoading = false;

            if (estimateId == null || estimateId.length < 1) {
                $location.path("/");
                return;
            }

            //TODO: there is probably a common way to force a logged in user
            if ($rootScope.currentUser == null) {
                $location.path("/");
                return;
            }

            var request = {
                'method': 'GET',
                'headers': { 'HI_SESSION': $rootScope.sessionId },
                'url': '/estimates/' + estimateId,
            };

            $http(request).then(function successCallback(response) {
                $scope.estimate = response.data.Estimate;
                $scope.submitCaption = "Submit";

                if ($rootScope.currentUser.IsAgent)
                {
                    if( $scope.estimate.Responses.length > 0 )
                    {
                        $scope.agentPrice = $scope.estimate.Responses[0].EstimateValue;
                        $scope.agentNotes = $scope.estimate.Responses[0].Notes;
                        $scope.responseId = $scope.estimate.Responses[0].Id;
                        $scope.cloudCmaLink = $scope.estimate.Responses[0].CloudCMALink;
                        $scope.submitCaption = "Revise";
                    }
                }
                else
                {
                    $scope.agentCount = response.data.Estimate.Responses.length;
                    $scope.averagePrice = "Pending";

                    var totalPrice = 0;
                    for (var i = 0; i < $scope.estimate.Responses.length; i++) {
                        var response = $scope.estimate.Responses[i];
                        totalPrice += response.EstimateValue;

                        var dateInt = parseInt(response.CreatedOn.substr(6, response.CreatedOn.lastIndexOf('/')))
                        response.CreatedOn = new Date(dateInt);;

                        if (response.User.Picture != null) {
                            console.log(response.User.Picture.URL);
                            response.pictureUrl = response.User.Picture.URL;
                        }
                    }

                    if (totalPrice > 0) {
                        $scope.averagePrice = totalPrice / $scope.agentCount;
                    }
                }

                if (responseId) {
                    $scope.response = $scope.estimate.Responses.filter(function (item) {
                        return item.Id == responseId;
                    })[0];
                }
                

            }, function errorCallback(response) {

                //TODO: this should not be a message box
                //TODO: figure out how validation works in angular
                $rootScope.ShowGenericMessageBox("Unable to retreive properties", response.data.ResponseStatus.Message, function () {

                });
            });

            $scope.SubmitResponse = function (agentPrice, agentNotes, responseId, cloudCmaLink) {

                if ($scope.submitLoading) return;

                //TODO: Validation
                if (isNaN(agentPrice)) {
                    $rootScope.ShowGenericMessageBox("Invalid price", "You must enter a numeric value for the price.", function () {

                    });
                    return;
                }

                var request = {
                    'method': 'POST',
                    'headers': { 'HI_SESSION': $rootScope.sessionId },
                    'url': '/estimates/' + estimateId + '/responses',
                    'data': {
                        'EstimateValue': agentPrice,
                        'Notes': agentNotes,
                        'ResponseId': responseId,
                        'CloudCMALink': cloudCmaLink
                    }
                };

                $scope.submitLoading = true;

                $http(request).then(function successCallback(response) {
                    $scope.submitLoading = false;

                    $rootScope.ShowGenericMessageBox("Response submitted", "The homeowner will be notified of your submission.", function () {
                        $location.path('/dashboard/properties');
                    });

                }, function errorCallback(response) {

                    $scope.submitLoading = false;

                    //TODO: this should not be a message box
                    //TODO: figure out how validation works in angular
                    $rootScope.ShowGenericMessageBox("Unable to retreive properties", response.data.ResponseStatus.Message, function () {

                    });
                });
            };

            $scope.showResponse = function (response) {
                var detailsUrl = '/dashboard/properties/' + estimateId + '/response/' + response.Id;
                $location.path(detailsUrl);
            }

            $scope.StartConversation = function (user, estimate) {
                if ($rootScope.currentUser.IsAgent && !$rootScope.currentUser.IsPremium) {
                    $rootScope.ShowGenericMessageBox(
                        "Premium Feature!",
                        "Sending messages to homeowners is a Premium Feature.<br><a href=\"/pricing\">Click here</a> to find out about becoming a Premium Agent"
                    );
                } else {
                    $rootScope.NewConversation = {
                        User: user,
                        Estimate: estimate
                    }
                    $location.path('/dashboard/messages/');
                }
            }
        }
    ]);

})();
