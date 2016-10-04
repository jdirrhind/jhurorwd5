/* File: menuapp.module.js
 * Module definition.
 */
(
    function() {
        'use strict';
        angular.module('MenuApp', ['ui.router', 'data'])
            .constant('AppConfig', {
                Restaurant: {
                    name:      'Calliphoridae Restaurant',
                    slogan:    "Ten million flies can't all be wrong!",
                    telephone: '1-800-591M0N3119' // 1-800-SALMONELLA ;-O
                }
            });

    }
)();

//
// Ends.
//
