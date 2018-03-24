
/* global angular */
(function () {
    "use strict";

    var module = angular.module('homingInDirectives', []);

    module.directive('googleplace', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, model) {
                var options = {
                    types: [],
                    componentRestrictions: {}
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                    scope.$apply(function () {
                        console.log("Updating value...");
                        model.$setViewValue(element.val());

                        scope.googleAddressChanged();
                    });
                });
            }
        };
    });

    module.directive('inputNumber', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function onlyNumber(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(onlyNumber);
            }
        };
    });

    module.directive('intlTelInput', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attr, ctrl) {

                elm.intlTelInput({
                    initialCountry: 'us'
                });

                ctrl.$parsers.push(parseIntl);

                ctrl.$formatters.push(formatterIntrl);

                elm.on("countrychange", function (e, countryData) {
                    parseIntl();
                });

                function parseIntl(value) {
                    var phoneNumber = elm.intlTelInput("getNumber");
                    var intlPhoneNumber = elm.intlTelInput("getNumber", intlTelInputUtils.numberFormat.NATIONAL)
                    ctrl.$setViewValue(intlPhoneNumber);
                    ctrl.$render();
                    return phoneNumber;
                }

                function formatterIntrl(value) {
                    if (value) {
                        elm.intlTelInput('setNumber', value);
                        setTimeout(function () {
                            var intlPhoneNumber = elm.intlTelInput("getNumber", intlTelInputUtils.numberFormat.NATIONAL)
                            ctrl.$setViewValue(intlPhoneNumber);
                        })
                    }
                    return value;
                }
            }
        }
    });

    module.directive('backButton', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);


    module.directive('pagination', function ($filter) {
        return {
            restrict: 'E',
            template: '<ul class="properties-filter_pagination" ng-show="total && pages.length > 1">\
                        <li ng-repeat="page in pages track by $index" ng-bind="$index+1" ng-class="{active: current == $index}" ng-click="selectPage($index)"></li>\
                    </ul>',
            scope: {
                current: '=',
                total: '=',
                size: '='
            },
            link: function (scope, element, attrs) {
                scope.pages = [];
                scope.current = 0;

                scope.selectPage = function(index) {
                    scope.current = index;
                }

                scope.$watch('total', function () {
                    if (scope.total) {
                        
                        var maxPages = Math.ceil(scope.total / scope.size);
                        scope.pages.length = maxPages;

                        if (scope.current >= maxPages) {
                            scope.current = maxPages-1;
                        }
                    }
                })
                
            }
        }
    })

    module.directive('switch', function () {
        return {
            restrict: 'E',
            template: '<label class="switch">\
                            <input type="checkbox" ng-model="ngModel"/>\
                            <span class="switch-handle" data-true="Yes" data-false="No"></span>\
                        </label>',
            scope: {
                ngModel: '='
            },
            link: function (scope, element, attrs) {
                var handle = element.find('.switch-handle');
                if (attrs.switchTrue) {
                    handle[0].setAttribute('data-true', attrs.switchTrue);
                }
                if (attrs.switchFalse) {
                    handle[0].setAttribute('data-false', attrs.switchFalse);
                }
            }
        }
    })

    module.directive('userPic', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.addClass('user-pic');
                var placeholder = attrs.userPicPlaceholder;

                attrs.$observe('userPic', function (pic) {
                    if (pic) {
                        element.css('background-image', 'url(' + pic + ')');
                    } else if (placeholder) {
                        element.css('background-image', 'url(' + placeholder + ')');
                    }
                });
            }
        }
    })

})();

