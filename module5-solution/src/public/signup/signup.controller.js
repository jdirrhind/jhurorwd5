/* File: signup.controller.js
** Controller definition.
*/
(
    function() {
        'use strict';

        angular.module('public')
            .controller('SignupController', SignupController);

        SignupController.$inject = ['SignupService', 'MenuService', '$q', '$timeout'];
        function SignupController(SignupService, MenuService, $q, $timeout) {
            var suc = this;

            // Controller state.
            suc.form = {
                // Form fields.
                firstName:      '',
                lastName:       '',
                email:          '',
                telephone:      '',
                favouriteDish:  '',

                // Additional state.
                erroneousDish:        '',
                validFavourite:       null,
                showDataSavedMessage: false
            };

            var MESSAGE_TIMEOUT=3000;

            /*
            ** Publicly visible API.
            */
            suc.submitForm      = submitForm;
            suc.failsValidation = fieldHasErrors;


            /*
            ** Implementation details.
            */

            // Invoked by the user when clicking on the submit button.
            // Validates the favourite dish and, if good, saves the
            // user's signup details.
            function submitForm() {
                var dishId = SignupService.sanitiseDishId(suc.form.favouriteDish);
                SignupService.favDishIsValid(dishId)
                    .then(function(validDish) {
                        suc.form.validFavourite = validDish;
                        // Save details if valid. Also, set the form field to
                        // match the (sanitised) dishId for
                        // consistency.
                        if (validDish) {
                            suc.form.erroneousDish = undefined;
                            suc.form.favouriteDish = dishId;
                            saveFormData(suc.form);
                        } else {
                            // Record the problematic dishId for use in giving user feedback.
                            suc.form.erroneousDish = dishId;
                        }
                    })
                    .catch(function(error) {
                        suc.form.validFavourite = false;
                    });
            }

            // Returns whether or not the given form field object indicates
            // that the specific error is present (or any errors at all are
            // present when specificError is not supplied).
            function fieldHasErrors(field, specificError) {
                var fieldIsInvalid;

                if (specificError) {
                    fieldIsInvalid = field.$error[specificError];
                } else {
                    fieldIsInvalid = field.$invalid;
                }

                return ((!field.$pristine || field.$touched) && fieldIsInvalid);
            }

            // Persist the given form data using the formdata save service.
            function saveFormData(formData) {
                // Pick and choose what to save away.
                var dataToSave = {
                    firstName:     formData.firstName,
                    lastName:      formData.lastName,
                    email:         formData.email,
                    telephone:     formData.telephone,
                    favouriteDish: formData.favouriteDish
                };
                
                var promise = SignupService.saveRegistrationData(dataToSave);
                promise
                    .then(function (response) {
                        suc.form.showDataSavedMessage = response;

                        // If successful, schedule the removal of the saved message.
                        $timeout(function () {
                            suc.form.showDataSavedMessage = false;
                        }, MESSAGE_TIMEOUT);
                    })
                    .catch(function (error) {
                        console.log(error);
                        suc.form.showDataSavedMessage = false;
                    });
            }
        }
    }
)();

//
// Ends.
//
