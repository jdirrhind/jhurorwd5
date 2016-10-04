/* File: menuapp.controller.js
 * Controller definition.
 */
(
    function() {
        'use strict';
        angular.module('MenuApp')
            .controller('MenuAppController', MenuAppController);

        MenuAppController.$inject = ['AppConfig'];
        function MenuAppController(AppConfig) {
            var mac = this;

            // Not much going on in this controller except passing on the
            // application configuration data.
            mac.restaurant = AppConfig.Restaurant;
        }
    }
)();

//
// Ends.
//
