/* File: data.module.js
 * Module definition.
 */
(
    function() {
        'use strict';
        angular.module('data', [])
            .constant('DataConfig', {
                MenuServerURL: 'https://davids-restaurant.herokuapp.com',
                CategoryPath:  '/categories.json',
                ItemsPath:     '/menu_items.json'
            });
    }
)();

//
// Ends.
//
