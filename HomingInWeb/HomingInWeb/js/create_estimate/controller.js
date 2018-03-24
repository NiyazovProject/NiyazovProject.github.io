/* global angular */
(function () {
    "use strict";

    var app = angular.module('homingApp.create_estimate.controllers', []);

    app.controller('createEstimateController', ['$scope', '$http', "$location", '$rootScope', '$window', '$q', '$cookies', 'Upload',
        function ($scope, $http, $location, $rootScope, $window, $q, $cookies, Upload) {
            console.log("createEstimateController Init");

            $rootScope.GetAnonymousSessionIfNeeded();

            if ($rootScope.selectedProperty == null || $rootScope.selectedProperty.addressComponents == null) {
                $location.path("/");
                return;
            }

            $scope.isWorking = false;
            $scope.anonymousEmail = "";

            $('#estimateCreatedPopup.popup-body').fadeOut(0);
            $('#estimateCreatedPopup.popup-body').removeClass('popup-visible');
            $('body').removeClass('is-popup');

            $scope.formattedAddress = $rootScope.selectedProperty.address;
            $scope.mapEmbedUrl = $rootScope.selectedProperty.mapEmbedUrl;
            $scope.imageUrl = $rootScope.selectedProperty.imageUrl;

            toDataUrl($scope.imageUrl, function (data) {
                $scope.imageUrl = data;
            })


            $scope.pictures = [];
            $scope.currentPicture = null;
            $scope.downloadUrl = "https://www.google.com/logos/doodles/2016/fourth-of-july-2016-5633480818950144-hp.jpg";

            $scope.DeletePicture = function (picture) {
                $scope.pictures.remByVal(picture);
            };

            $scope.AddPicture = function (files) {
                if (files.length) {
                    $q.all(files.map(function (file) {
                        var deferred = $q.defer();

                        Upload.dataUrl(file, true).then(function (dataUrl) {
                            $scope.pictures.push({
                                dataUrl: dataUrl,
                                type: 'Unknown'
                            });
                            deferred.resolve();
                        });

                        return deferred.promise;

                    })).then(function () {
                        $scope.OfferChoosePhotoType();
                    })

                }
            }

            $scope.ChoosePhotoCategory = function (category) {
                $scope.currentPicture.type = category;
                $scope.currentPicture = null;
                $scope.OfferChoosePhotoType();
            }

            $scope.OfferChoosePhotoType = function () {
                for (var i = 0; i < $scope.pictures.length; i++) {
                    // Find image without category
                    if ($scope.pictures[i].type === 'Unknown') {
                        $scope.currentPicture = $scope.pictures[i];
                        break;
                    }
                }

                if ($scope.currentPicture) {
                    $rootScope.ShowPopup('#photoCategoryPopup');
                } else {
                    $rootScope.HidePopup('#photoCategoryPopup');
                }
            }


            var FindAddressComponent = function (component) {
                var allComponents = $rootScope.selectedProperty.addressComponents;
                for (var i = 0; i < allComponents.length; i++) {
                    for (var j = 0; j < allComponents[i].types.length; j++) {
                        if (allComponents[i].types[j] == component)
                            return allComponents[i].short_name;
                    }
                }
            };

            $scope.streetAddress = FindAddressComponent("street_number") + " " + FindAddressComponent("route");
            $scope.city = FindAddressComponent("locality");
            if ($scope.city == undefined || $scope.city == null)
                $scope.city = FindAddressComponent("neighborhood");
            $scope.state = FindAddressComponent("administrative_area_level_1");
            $scope.postalCode = FindAddressComponent("postal_code");
            $scope.unitNumber = null;

            $scope.ShowEstimateCreatedPopup = function () {
                $('#estimateCreatedPopup.popup-body').fadeIn(200);
                $('#estimateCreatedPopup.popup-body').addClass('popup-visible');
                $('body').addClass('is-popup');

                $rootScope.ShowGenericMessageBox("Thank you for submitting!", "Your home's current market value is being researched by Real Estate Professionals, and will be submitted for your review.", function () {
                    $location.path("/");
                });
            }

            $scope.ShowCollectAnonymousEmail = function () {
                $('#anonymousEstimateCreatedPopup.popup-body').fadeIn(200);
                $('#anonymousEstimateCreatedPopup.popup-body').addClass('popup-visible');
                $('body').addClass('is-popup');
            }

            $scope.HideCollectAnonymousEmail = function () {
                $('#anonymousEstimateCreatedPopup.popup-body').fadeOut(200);
                $('#anonymousEstimateCreatedPopup.popup-body').removeClass('popup-visible');
                $('body').removeClass('is-popup');
            }

            $scope.ShowProgressWindow = function () {
                $('#submitProgress.popup-body').fadeIn(200);
                $('#submitProgress.popup-body').addClass('popup-visible');
                $('body').addClass('is-popup');
            }

            $scope.HideProgressWindow = function () {
                $('#submitProgress.popup-body').fadeOut(200);
                $('#submitProgress.popup-body').removeClass('popup-visible');
                $('body').removeClass('is-popup');
            }

            $scope.AddEmail = function () {

                var isValidEmail = $rootScope.ValidateEmail($scope.anonymousEmail);
                if (isValidEmail) {
                    $scope.HideCollectAnonymousEmail();
                    $scope.CreateEstimate();
                }
                else
                {
                    $rootScope.ShowGenericMessageBox("Invalid Email", "A valid email must be provided.", function () {

                    });
                }
            };

            $scope.UpdateProgressPercent = function (percent) {

                var np = document.getElementById("nowprogress");
                var ip = document.getElementById("infoprogress");

                ip.innerHTML = Math.floor(percent) + "%";
                np.style.width = percent + "%";
            }

            $scope.CreateEstimate = function () {
                if ($scope.isWorking) return;

                $scope.isWorking = true;
                
                if ($rootScope.currentUser == null) {
                    console.log("Current user is null... something went wrong.");
                    $rootScope.LogOut();
                    return;
                }

                if ($rootScope.currentUser.FirstName == "Anonymous" && ($scope.anonymousEmail == null || $scope.anonymousEmail.length < 1)) {
                    $scope.isWorking = false;
                    $scope.ShowCollectAnonymousEmail();
                    return;
                }

                if (!$scope.pictures.length) {
                    $scope.isWorking = false;
                    $rootScope.ShowPopup('#missingImagePopup');
                    return;
                }

                var request = {
                    method: 'POST',
                    url: 'estimate',
                    headers: { 'HI_SESSION': $rootScope.sessionId },
                    data: {
                        address: $scope.streetAddress,
                        city: $scope.city,
                        state: $scope.state,
                        postalCode: $scope.postalCode,
                        unitNumber: $scope.unitnumber,
                        notes: $scope.notes,
                        pictureCount: $scope.pictures.length,
                        AnonymousEmail: $scope.anonymousEmail,
                        PremiumAgentId: $cookies.get("premiumAgentId")
                    }
                };

                $scope.ShowProgressWindow();
                
                var stepCount = $scope.pictures.length + 1;
                var currentStep = 0;
                $scope.UpdateProgressPercent(0);

                $http(request).then(function successCallback(response) {
                    currentStep = currentStep + 1;
                    var progress = (currentStep / stepCount) * 100;;
                    $scope.UpdateProgressPercent(progress);
                    $cookies.remove("premiumAgentId");

                    var activeUploadCount = 0;
                    var estimateId = response.data.EstimateId;

                    for (var i = 0; i < $scope.pictures.length ; i++) {
                        var picture = $scope.pictures[i];

                        var pictureRequest = {
                            'method': 'POST',
                            'url': '/estimates/' + estimateId + '/images',
                            'headers': { 'HI_SESSION': $rootScope.sessionId },
                            'data': {
                                'PictureType': picture.type,
                                'Base64Picture': picture.dataUrl
                            }
                        }

                        activeUploadCount = activeUploadCount + 1;

                        console.log("Uploading...");
                        $http(pictureRequest).then(function successCallback(pictureResponse) {
                            console.log("Uploaded picture to url: " + pictureResponse.data.PictureURL);

                            currentStep = currentStep + 1;
                            progress = (currentStep / stepCount) * 100;;
                            $scope.UpdateProgressPercent(progress)

                            activeUploadCount = activeUploadCount - 1;
                            if (activeUploadCount < 1) {
                                currentStep = currentStep + 1;
                                progress = (currentStep / stepCount) * 100;;
                                $scope.UpdateProgressPercent(progress)

                                $scope.HideProgressWindow();
                                $scope.ShowEstimateCreatedPopup();
                            }
                                

                        }, function errorCallback(pictureResponse) {
                            console.log("Failed to upload picture...");

                            activeUploadCount = activeUploadCount - 1;
                            if (activeUploadCount < 1)
                                $scope.ShowEstimateCreatedPopup();
                        });
                    }

                    if (activeUploadCount < 1) {
                        $scope.HideProgressWindow();
                        $scope.ShowEstimateCreatedPopup();
                    }

                    $scope.isWorking = false;
                }, function errorCallback(response) {

                    $scope.HideCollectAnonymousEmail();
                    $scope.HideProgressWindow();

                    //TODO: this should not be a message box
                    $rootScope.ShowGenericMessageBox("Unable to create estimate", response.data.ResponseStatus.Message, function () {
                        
                    });

                    $scope.isWorking = false;
                });
            }

            $scope.CreateEstimateWithoutImages = function () {
                $scope.pictures.push({
                    'type': 'FrontOfHouse',
                    'dataUrl': $scope.imageUrl
                });

                $rootScope.HidePopup('#missingImagePopup');
                $scope.CreateEstimate();
            }

            function toDataUrl(url, callback) {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function() {
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        callback(reader.result);
                    }
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', url);
                xhr.send();
            }
        }

    ]);
})();
