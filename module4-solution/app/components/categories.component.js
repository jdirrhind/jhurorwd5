/* File: categories.component.js
 * Categories component definition.
 */
// Reminder:
// Components only control their own View and Data.
// They never modify data or DOM outside their own scope.
// Angular Components always use isolate scope.
// Component controller: if the component's controller has no functionality,
// do not specify it and AngularJS will create an empty one for you on the
// isolate scope and call it $ctrl.
//
// API convention:
// Inputs:  use '<' and '@' bindings only.
// Outputs: use '&' for component event callbacks.
//
// Component API Lifecycle methods: 
// $onInit - controller initialisation code.
// $onChanges(obj) - called whenever one-way bindings are updated.
// $postLink - similar to 'link' in directive.
// $onDestroy - when scope is about to be destroyed.
(
    function() {
        'use strict';
        angular.module('data')
            .component('categories', {
                templateUrl: 'app/components/categories.template.html'
            });
    }
)();

//
// Ends.
//
