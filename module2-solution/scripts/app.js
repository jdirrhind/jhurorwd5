/*
 * app.js
 */
// Immediately Invoked Function Expression
(
    function() {
        'use strict';
        angular.module('ShoppingListCheckOff', [])

        // Register the application controllers.
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)

        // Register application services.
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

        // Controller Definitions.
        ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
        function ToBuyShoppingController(ShoppingListCheckOffService) {
            var toBuy     = this;
            // Fetch the 'to buy' items and make them available.
            toBuy.items   = ShoppingListCheckOffService.getToBuyItems();

            // Delegate item purchase to the shopping list checkoff service.
            toBuy.buyItem = function(itemIndex) {
                ShoppingListCheckOffService.buyItem(itemIndex);
            };
        }

        AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
        function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
            var alreadyBought   = this;
            // Fetch the 'bought' items and make them available.
            alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
        }

        // Service Definitions.
        function ShoppingListCheckOffService() {
            var service = this;

            // Initial data.
            var toBuyItems = [
              { name: 'Cookies', quantity: 10 },
              { name: 'Olive Oil', quantity: 3 },
              { name: 'Eggs', quantity: 12 },
              { name: 'Nuts', quantity: 24 },
              { name: 'Cornflakes', quantity: 3 },
              { name: 'Hummus', quantity: 4 },
              { name: 'Garlic bulbs', quantity: 3 },
              { name: 'Bananas', quantity: 2 },
              { name: 'Apples', quantity: 2 },
              { name: 'Lemons', quantity: 4 }
            ];
            var boughtItems = [];

            // Service functions.
            service.getToBuyItems = function() {
                return toBuyItems;
            };

            service.getBoughtItems = function() {
                return boughtItems;
            };

            service.buyItem = function(itemIndex) {
                boughtItems.push(toBuyItems[itemIndex]);
                toBuyItems.splice(itemIndex, 1);
            };
        }
    }
)();
//
// Ends.
//
