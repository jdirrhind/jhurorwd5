/* File: narrow.controller.js
 * Controller definition.
 */
(
    function() {
        'use strict';
        angular.module('NarrowItDownApp')
        .controller('NarrowItDownController', NarrowItDownController);

        NarrowItDownController.$inject = ['MenuSearchService'];
        function NarrowItDownController(MenuSearchService) {
            var nid = this;

            // Controller state.
            nid.searchTerm        = '';    // Records the text the user types.
            nid.found             = null;  // Stored (filtered) search results.
            nid.loadingInProgress = false; // Shows/hides the spinning loader icon.

            // The main controller search function.
            // Invoked when the user clicks a button.
            nid.doNarrow = function() {
                // If the search term is left empty, the result will 
                // be empty so don't bother to call the menu search service. 
                if (nid.searchTerm.trim() === '') {
                    nid.found = [];
                }
                else {
                    // Otherwise use the MenuSearchService to fetch and 
                    // then filter the results.
                    nid.loadingInProgress = true;
                    var promise = MenuSearchService.getMatchedMenuItems(nid.searchTerm);

                    promise.then(function(result) {
                        nid.found = result;
                    })
                    .catch(function(error) {
                        nid.found = [];
                        console.log('Something went wrong', error);
                    })
                    .finally(function() {
                        nid.loadingInProgress = false;
                    });
                }
            };

            // The search result item removal function. 
            // Invoked by the application's founditems component.
            nid.removeIt = function(itemIndex) {
                // Remove the item at the specified index from 
                // the found items list.
                nid.found.splice(itemIndex, 1);
            };
        }
    }
)();

//
// Ends.
//
