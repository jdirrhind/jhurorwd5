/* File: items.component.js
 * Controller definition.
 */
(
    function() {
        'use strict';
        angular.module('data')
            .controller('ItemsController', ItemsController);

        ItemsController.$inject = ['fetchedItems'];
        function ItemsController(fetchedItems) {
            var ic = this;

            // The list of fetched items is passed in via the view state's
            // 'resolve' property.
            ic.fetchedItems   = fetchedItems;
            ic.itemsAvailable = (fetchedItems &&
                                 fetchedItems.menu_items &&
                                 fetchedItems.menu_items.length !== 0);
        }
    }
)();

//
// Ends.
//
