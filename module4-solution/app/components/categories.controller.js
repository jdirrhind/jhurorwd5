/* File: categories.component.js
 * Controller definition.
 */
(
    function() {
        'use strict';
        angular.module('data')
            .controller('CategoryController', CategoryController);

        CategoryController.$inject = ['fetchedCategories'];
        function CategoryController(fetchedCategories) {
            var cc = this;

            // The list of fetched categories is passed in via the view
            // state's 'resolve' property.
            cc.fetchedCategories   = fetchedCategories;
            cc.categoriesAvailable = (fetchedCategories &&
                                      fetchedCategories.length !== 0);
        }
    }
)();

//
// Ends.
//
