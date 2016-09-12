/*
 * app.js
 */
(
    function() {
        'use strict';

        // Register the application controllers.
        angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

        // Define the LunchCheck controller, ensuring the $scope service
        // is injected in such a way as to protect the code from minification.
        LunchCheckController.$inject = ['$scope'];
        function LunchCheckController($scope) {
            // Initialisation.
            $scope.lunchMenu         = '';
            $scope.feedbackMessage   = '';
            $scope.validationStatus  = '';
            $scope.messageExtraStyle = '';

            // Publicly visible functions.
            $scope.performLunchCheck = function() {
                // Called upon clicking the "check if too much" button in index.html.
                // Alters the following $scope properties when called:
                //  feedbackMessage   - the feedback text given to the user.
                //  messageExtraStyle - a bootstrap style for the feedback text.
                //  validationStatus  - a bootstrap style for the input box.
                var count = getLunchItemCount($scope.lunchMenu);
                if (count === 0) {
                    $scope.feedbackMessage   = 'Please enter data first';
                    $scope.messageExtraStyle = 'text-danger';
                    $scope.validationStatus  = 'has-error';
                } else if (count <= 3) {
                    $scope.feedbackMessage   = 'Enjoy!';
                    $scope.messageExtraStyle = 'text-success';
                    $scope.validationStatus  = 'has-success';
                } else {
                    $scope.feedbackMessage   = 'Too much!';
                    $scope.messageExtraStyle = 'text-success';
                    $scope.validationStatus  = 'has-success';
                }
            };

            // Non-publicly visible functions.
            var getLunchItemCount = function(items) {
                // Returns the number of non-blank, comma-
                // separated lunch items in the given string.
                // Note: will not count empty/blank items.
                var count     = 0;
                var itemArray = items.split(',');
                for(var i=0; i < itemArray.length; ++i) {
                    // Could instead have used the for..of loop here but that
                    // risks incompatibility with some graders' browsers.
                    if (itemArray[i].trim() !== '') {
                        count++;
                    }
                }
                return count;
            };
        }
    }
)();
