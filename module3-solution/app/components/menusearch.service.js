/* File: menusearch.service.js
 * Menu search Service definition.
 */
(
    function() {
        'use strict';
        angular.module('NarrowItDownApp')
        .service('MenuSearchService', MenuSearchService);

        MenuSearchService.$inject = ['AppConfig', '$http'];
        function MenuSearchService(AppConfig, $http) {
            var service = this;

            // Publicly Visible Service Functions.
            service.getMatchedMenuItems = function(searchTerm) {
                // Make the asynchronous call to the data server, returning
                // the call's promise.
                var request = {
                   method: 'GET',
                   url:    (AppConfig.MenuServerPath + '/menu_items.json')
                };

                var promise = $http(request).then(
                    function(response) {
                        // Return the filtered result.
                        return filterResponse(response.data.menu_items, searchTerm);
                    });

                return promise;
            };

            // Private Service Functions.
            var filterResponse = function(menuItemArray, searchTerm) {
                // Return entries in menuItemArray which contain the 
                // searchTerm text within each entry's description property.
                var filteredResult = menuItemArray.filter(function(element) {
                        return (element.description.indexOf(searchTerm) !== -1);
                    });

                return filteredResult;
            };
        }
    }
)();

//
// Ends.
//
