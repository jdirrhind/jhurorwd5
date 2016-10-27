/* File: signup.service.js
 * Service definition.
 */
(
    function() {
        'use strict';
        
        angular.module('public')
            .service('SignupService', SignupService);

        SignupService.$inject = ['$timeout', '$q', 'MenuService'];
        function SignupService($timeout, $q, MenuService) {
            var service = this;
            var TIMEOUT = 500; // Timeout for save data function.

            /*
            ** Service state.
            */

            // Store signup data within the service.
            // This will suffice for this assignment. 
            var signupData;

            /* 
            ** Publicly visible service functions.
            */
            service.saveRegistrationData = saveRegistrationData;
            service.getRegistrationData  = getRegistrationData;
            service.favDishIsValid       = favDishIsValid;
            service.sanitiseDishId       = sanitiseDishId;

            /*
            ** Implementation details.
            */
            // Persist the given registration data to 'service storage.'
            // Returns a promise which resolves to operation success or
            // failure (paving the way for future enhancement involving a REST
            // endpoint).
            function saveRegistrationData(formData) {
                var deferred = $q.defer();

                $timeout(function() {
                    signupData = angular.copy(formData);
                    deferred.resolve(true);
                }, TIMEOUT);

                return deferred.promise;
            }

            // Return the data saved away by saveRegistrationData().
            function getRegistrationData() {
                var deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(angular.copy(signupData));
                }, TIMEOUT);

                return deferred.promise;
            }

            // Sanitise the given dishId to remove unnecessary (or
            // even malicious injection) content.
            function sanitiseDishId(dishId) {
                var cleanedDishId = dishId.trim().toUpperCase().replace(/[^a-z,0-9]/ig, '');
                return cleanedDishId;
            }

            // Return whether or not the given dish identifier represents a
            // valid menu item short name. Returns a promise which resolves to
            // the outcome.
            function favDishIsValid(dishId) {
                // We return the result via this deferred object.
                var deferredResult = $q.defer();

                if (dishId === '') {
                    // Empty strings yield an immediate valid response - the user hasn't made
                    // up their mind yet, so cut them some slack.
                    deferredResult.resolve(true);
                } else {
                    // Look up the dish details and validate.
                    var promise = MenuService.getMenuItem(dishId);
                    promise
                        .then(function(item) {
                            // Item found.
                            deferredResult.resolve(true);
                        })
                        .catch(function (error) {
                            // Item not found or other error occurred.
                            deferredResult.reject(error);
                        });
                }

                return deferredResult.promise;
            }
            
        }
    }
)();

//
// Ends.
//
