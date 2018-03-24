(function () {
    "use strict";

    var app = angular.module('photosService', [])

    app.controller('photosCtrl', ['$scope', '$sce', '$rootScope', '$cookieStore', '$routeParams',
        function ($scope, $sce, $rootScope, $cookieStore, $routeParams) {
            console.log("PHOTOS")
            $scope.addingPhotos = 1;
            $scope.photos = []
            $("#set_room_type").css({ "left": (($('.room_type_selector').width() - 460) / 2) + "px" });
            $scope.rooms_types = $rootScope.room_types;
            $scope.loadImages = function () {
                $.each($(".room_pic_display_cell"), function (index) {
                    if (index > $rootScope.photos.length ) {
                        $(".display_cell_" + index).css({ "display": "none" });
                        $(".cell_" + index).css({ "background-image": '' });
                    }
                });
                console.log($rootScope.photos)
                $.each($rootScope.photos, function (index) {
                    console.log(index)
                    $(".display_cell_" + index).css({ "display": "inline" });
                    $(".cell_" + index).css({ "background-image": "url(" + $rootScope.photos[index][0] + ")" });
                    $(".cell_" + index).css({ "background-size": "auto 100%" });
                    $(".cell_" + index).css({ "background-repeat": "no-repeat" });
                    $(".cell_" + index).css({ "background-position": "center top" });
                    $('#rem_cell_' + index).css({ "display": '' });
                });
            }
            $scope.loadImages();
            $.uploadPreview({
                input_field: "#image-upload",   // Default: .image-upload
                preview_box: ".image-preview",  // Default: .image-preview
                label_field: "#image-label",    // Default: .image-label
                label_default: "Choose File",   // Default: Choose File
                label_selected: "Change File",  // Default: Change File
                no_label: true,                 // Default: false
                photos: $rootScope.photos,
                finish: $scope.loadImages,
                page: "photos"
            });
            $(".control_container").css({ "min-height": ($("#sub_height_container").height() + 40 + (240)) + 'px' });
            $(".room_pic_display").css({ "width": $(".room_uploader").width() + 'px' });
            resizer(0)

            $(window).resize(function () {
                $(".control_container").css({ "min-height": ($("#sub_height_container").height() + 40 + (240)) + 'px' });
                $(".room_pic_display").css({ "width": $(".room_uploader").width() + 'px' });
                resizer(0)
            });
            $(".room_type_selector").css({ "display": 'none' });
            $("#upload_link_window").css({ "display": 'none' });
            $("#set_room_type").css({ "display": 'none' });
            $scope.remUpl = {}
            $scope.remUpl.doClick = function (cellVar) {
                $rootScope.room_types[cellVar][0] = false
                //#14427A
                $('#room_type_' + cellVar).css({ "background-color": "#14427A" });
                $rootScope.photos[cellVar][1] = ""
                $(".cell_" + cellVar).css({ "background-image": '' });
                $rootScope.photos.splice(cellVar, 1);
                $('#rem_cell_' + cellVar).css({ "display": 'none' });
                $(".display_cell_" + cellVar).css({ "display": "none" });
                $scope.loadImages();
            }
            $scope.linkUpl = {}
            $scope.linkUpl.setRoom = function (index) {
                console.log($rootScope.photos.length - $scope.addingPhotos)
                var tmpIndex = 0
                $rootScope.room_types[index][0] = true
                $rootScope.photos[$rootScope.photos.length - $scope.addingPhotos][1] = $rootScope.room_types[index][1];
                $('#rem_cell_' + ($rootScope.photos.length - $scope.addingPhotos)).css({ "display": '' });
                $('#room_type_' + index).css({ "background-color": "#14427A" });
                if ($scope.addingPhotos <= 1) {
                    $(".room_type_selector").css({ "display": 'none' });
                    $("#upload_link_window").css({ "display": 'none' });
                    $("#set_room_type").css({ "display": 'none' });
                    $scope.addingPhotos = 1;
                } else {
                    $scope.addingPhotos = $scope.addingPhotos - 1
                }
                $scope.photos = $rootScope.photos;
                console.log($rootScope.photos);
            }
            $scope.linkUpl.doClick = function (tmpBool) {
                if (tmpBool) {
                    $(".room_type_selector").css({ "display": 'none' });
                    $('#rem_cell_' + ($rootScope.photos.length - 1)).css({ "display": '' });
                    $("#upload_link_window").css({ "display": 'none' });
                    $("#set_room_type").css({ "display": 'none' });
                    console.log($("#urlbox").val())
                    if ($("#urlbox").val() != "") {
                        $rootScope.photos.push([$("#urlbox").val(), ""]);
                        $scope.loadImages();
                        $("#urlbox").val("")
                        $(".room_type_selector").css({ "display": '' });
                        $("#set_room_type").css({ "display": '' });
                        //$rootScope.postal_codes
                    }
                } else {
                    $(".room_type_selector").css({ "display": '' });
                    $("#upload_link_window").css({ "display": '' });
                }
            }
            var obj = $("#dragandrophandler");
            obj.on('dragenter', function (e) {
                e.stopPropagation();
                e.preventDefault();
                $(this).css('border', '2px solid #0B85A1');
            });
            obj.on('dragover', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
            obj.on('drop', function (e) {

                $(this).css('border', '2px dotted #0B85A1');
                e.preventDefault();
                var files = e.originalEvent.dataTransfer.files;

                //We need to send dropped files to Server
                handleFileUpload(files, obj, e);
            });
            $(document).on('dragenter', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
            $(document).on('dragover', function (e) {
                e.stopPropagation();
                e.preventDefault();
                obj.css('border', '2px dotted #0B85A1');
            });
            $(document).on('drop', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
            function handleFileUpload(files, obj, e) {
                //console.log(files)
                if ($(".tmpobj")[0]) {
                    console.log("REMOVED")
                    $(".tmpobj").remove();
                }
                if (files[0]["type"] == "image/jpeg") {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var reader = new FileReader();
                        var img = document.createElement("img");
                        img.classList.add("tmpobj");
                        img.file = file;
                        img.setAttribute("display", "none");
                        document.body.appendChild(img)
                        reader.onload = (function (aImg) {
                            return function (e) {
                                aImg.src = e.target.result;
                                $rootScope.photos.push([aImg.src, ""]);
                                $scope.loadImages()
                            };
                        })(img);
                        reader.readAsDataURL(file);

                        //$('.tmpobj').remove()
                    }
                    console.log(files.length)
                    // $rootScope.photos.push(files[0]["__proto__"])
                    // $scope.loadImages();
                    $scope.addingPhotos = files.length
                    $(".room_type_selector").css({ "display": '' });
                    $("#set_room_type").css({ "display": '' });
                }
            }
            $scope.submitPictures = function () {
                $.each($rootScope.photos, function (index) {
                    var photo = $rootScope.photos[index];
                    console.log('Uploading photo of: ' + photo[1]);

                    var estimateId = 1;
                    var sessionId = 'whatever... this is ignored for my test';
                    var request = {
                        'method': 'POST',
                        'url': 'estimates/' + estimateId + '/images',
                        'headers': {
                            'HI_SESSION': sessionId,
                        },
                        'data': {
                            'PictureType': $scope.pictureTypesAsInt[photo[1]],
                            'Base64Picture': photo[0]
                        }
                    };

                    $http(request).then(function successCallback(response) {
                        console.log('Picture uploaded to url: ' + response.data['PictureURL']);
                    }, function errorCallback(response) {
                        //error_message
                        console.log('Failed to upload picture: ' + response);
                    });
                });
            }
        }
    ])

})();