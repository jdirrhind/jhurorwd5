/* File: signup.menuitem.validator.js
** Validator directive definition.
*/
(
    function() {
        'use strict';

        angular.module('public')
            .directive('menuitem', MenuItemValidator);

        MenuItemValidator.$inject = ['SignupService', 'MenuService', '$q', '$timeout'];
        function MenuItemValidator(SignupService, MenuService, $q, $timeout) {
            var ddo = {
                require: 'ngModel',
                link:    validationFunction
            };

            /*
            ** Implementation details.
            */
            function validationFunction(scope, element, attrs, ctrl) {
                // Install an asynchronous validation function on the controller.
                // Note: this must return a promise (resolves ⇒ valid, rejects ⇒ invalid).
                ctrl.$asyncValidators.menuitem = function(modelValue, viewValue) {
                    // For more information on validation, see the Custom Validation section at
                    // https://docs.angularjs.org/guide/forms
                    var dishId = SignupService.sanitiseDishId(modelValue);
                    return SignupService.favDishIsValid(dishId);
                };
            }

            return ddo;
        }
    }
)();

//
// Ends.
//
