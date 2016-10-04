/* File: data.controller.js
 * Controller definition.
 */
(
    function() {
        'use strict';
        angular.module('data')
            .controller('DataController', DataController);

        DataController.$inject = ['MenuDataService'];
        function DataController(MenuDataService) {
            var dc = this;

            /*
            ** Publicly visible controller interface.
            */

            // Here we store the list of categories and items for a chosen
            // category.
            dc.categories = [];
            dc.items      = [];

            // Publicly visible functions.
            dc.fetchCategories = fetchCategories;
            dc.fetchItems      = fetchItems;

            // Implementation details.
            function fetchCategories () {
                // Retrieve the list of menu item categories.
                MenuDataService.getAllCategories()
                    .then(function(result) {
                        dc.categories = result;
                    })
                    .catch(function (error) {
                        console.log('Error:', error);
                    });
            }
            
            function fetchItems(category) {
                // Retrieve the list of menu items for the given category
                // short name.
                MenuDataService.getItemsForCategory(category)
                    .then(function(result) {
                        dc.items = result;
                    })
                    .catch(function (error) {
                        console.log('Error:', error);
                    });
            }
        }
    }
)();

//
// Ends.
//
