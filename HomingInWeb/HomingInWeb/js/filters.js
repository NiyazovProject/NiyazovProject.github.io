
/* global angular */
(function () {
    "use strict";

    var module = angular.module('homingInFilters', []);

    module.filter('sidebarSelected', function () {
        return function (input) {
            return input ? 'active' : '';
        };
    });

    module.filter('parseSqlDate', function() {
        return function (input) {
            if (typeof input == 'string') {
                var dateInt = parseInt(input.substr(6, input.lastIndexOf('/')));
                return new Date(dateInt);
            }
            return input;
        }
    });

})();

