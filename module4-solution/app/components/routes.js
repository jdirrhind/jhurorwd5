/* File: routes.js
 * Angular UI application routes definition.
 */
(
    function() {
        'use strict';
        angular.module('MenuApp')
            .config(RoutesConfiguration);

        // Application Route Configuration 
        RoutesConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];
        function RoutesConfiguration($stateProvider, $urlRouterProvider) {
            // UI States
            $stateProvider

                .state('home', {
                    // The home page state.
                    url: '/',
                    templateUrl: '/app/components/home.template.html'
                })

                .state('categories', {
                    // Lists all categories.
                    url: '/categories',
                    templateUrl: '/app/components/categories.template.html',
                    controller: 'CategoryController as cc',
                    resolve: {
                        fetchedCategories: ['MenuDataService', function(MenuDataService) {
                            return MenuDataService.getAllCategories();
                        }]
                    }
                })

                .state('items', {
                    // Lists items for a given category.
                    url: '/items/{category}',
                    params: { category:    { value: "" },
                              hiddenParam: { value: "" }, // Note to self: 'URL-invisible' parameters can be declared this way and accessed via $stateParams. They can also be populated in the resolve section, below.
                              '#':         { value: "" }  // Note to self: We can use this to append '#' followed by an ID to the generated URL. See template for details.
                            },
                    templateUrl: '/app/components/items.template.html',
                    controller: 'ItemsController as ic',
                    resolve: {
                        fetchedItems: ['$stateParams', 'MenuDataService',
                                       function($stateParams, MenuDataService) {
                                           return MenuDataService.getItemsForCategory($stateParams.category);
                                       }]
                    }
                });

            // Router Service Configuration
            $urlRouterProvider
                .otherwise('/');
        }
    }
)();

//
// Ends.
//
