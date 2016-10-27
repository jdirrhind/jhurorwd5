(function () {
    "use strict";

    angular.module('common')
        .service('MenuService', MenuService);


    MenuService.$inject = ['$http', 'ApiPath', '$q'];
    function MenuService($http, ApiPath, $q) {
        var service = this;

        service.getCategories = function () {
            return $http.get(ApiPath + '/categories.json').then(function (response) {
                return response.data;
            });
        };


        service.getMenuItems = function (category) {
            var config = {};
            if (category) {
                config.params = {'category': category};
            }

            return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
                return response.data;
            });
        };


        // Added as part of Assignment 5.
        // Retrieve data for a single menu item (by short name).
        service.getMenuItem = function (shortName) {
            var config = {};

            if (!shortName) {
                return $q.reject('No shortname provided');
            }

            return $http.get(ApiPath + '/menu_items/' + shortName + '.json', config)
                .then(function (response) {
                    return response.data;
                });
        };

        // Retrieve the JPEG image URL for a single menu item (by short name).
        service.getMenuItemImageURL = function(shortName) {
            if (shortName) {
                return (ApiPath + '/images/' + shortName + '.jpg');
            }
        };

        // Retrieve the JPEG image URL for the "Picture not available" image.
        // Note that this image comes from the web site host, not the REST host.
        service.getNoImageAvailableURL = function(shortName) {
            return ('images/no-image-available.jpg');
        };
    }

})();
