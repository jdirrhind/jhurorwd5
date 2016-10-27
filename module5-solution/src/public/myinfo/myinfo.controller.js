/* File: myinfo.controller.js
** Controller definition.
*/
(
    function() {
        'use strict';

        angular.module('public')
            .controller('MyinfoController', MyinfoController);

        MyinfoController.$inject = ['SignupService', 'resolvedRegisteredData', '$q', '$timeout', 'MenuService'];
        function MyinfoController(SignupService, resolvedRegisteredData, $q, $timeout, MenuService) {
            var mic = this;

            // Controller state.
            var TIMEOUT=3000;

            // The registered info is initially populated using a resolve in the
            // view state definition.
            mic.registeredInfo = resolvedRegisteredData;
            mic.isRegistered   = (resolvedRegisteredData !== undefined);
            getFavouriteMenuItem()
                .then(function (item) {
                    mic.retrievedDish = item;
                    // Fetch the menu item's image if one is available.
                    if (item) {
                        if (item.image_present) {
                            mic.retrievedDishImageURL = getFavouriteMenuItemImageURL();
                        } else {
                            mic.retrievedDishImageURL = getNoImageAvailableURL();
                        }
                    }
                })
                .catch(function (error) {
                    throw error;
                });

            /*
            ** Publicly visible API.
            */
            mic.getRegisteredInfo    = getRegisteredInfo;
            mic.isUserRegistered     = isUserRegistered;
            mic.getFavouriteMenuItem = getFavouriteMenuItem;
            
            /*
            ** Implementation details.
            */

            // Returns a promise resolving to the menu item object corresponding to 
            // the user's favourite dish, if specified. Returns undefined otherwise.
            function getFavouriteMenuItem() {
                if (mic.registeredInfo && mic.registeredInfo.favouriteDish) {
                    return MenuService.getMenuItem(mic.registeredInfo.favouriteDish)
                } else {
                    return $q.resolve(undefined);
                }
            }

            // Returns the URL corresponding to the user's favourite dish, if
            // specified. Returns undefined otherwise.
            function getFavouriteMenuItemImageURL() {
                if (mic.registeredInfo && mic.registeredInfo.favouriteDish) {
                    return MenuService.getMenuItemImageURL(mic.registeredInfo.favouriteDish);
                } else {
                    return undefined;
                }
            }

            // Returns the URL of a general 'picture not yet available' image.
            function getNoImageAvailableURL() {
                return MenuService.getNoImageAvailableURL();
            }

            // Returns a promise that resolves to the currently registered user data (if any).
            function getRegisteredInfo() {
                return SignupService.getRegistrationData();
            }

            // Returns a promise that resolves to whether or not there is a
            // user currently registered.
            function isUserRegistered() {
                var deferred       = $q.defer();
                var regDataPromise = getRegisteredInfo();
                regDataPromise
                    .then(function (response) {
                        var userIsRegistered = (response !== undefined);
                        deferred.resolve(userIsRegistered);
                    })
                    .catch(function (error) {
                        throw error;
                    });
                
                return deferred.promise;
            }
        }
    }
)();

//
// Ends.
//
