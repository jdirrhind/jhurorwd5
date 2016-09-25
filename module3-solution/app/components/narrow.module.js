/* File: narrow.module.js
 * Module definition.
 */
(
    function() {
        'use strict';
        angular.module('NarrowItDownApp', ['loader'])
        .constant('AppConfig', {
            MenuServerPath:    'https://davids-restaurant.herokuapp.com',
            AnotherConfigItem: 'can go here...'
        });
    }
)();

//
// Ends.
//
