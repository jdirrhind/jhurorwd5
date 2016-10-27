/* File: signup.service.spec
** Test Suite for the Signup Service's dish validation function.
*/
(
    function() {
        'use strict';
        var $timeout;
        var SignupService;
        var $httpBackend;
        var ApiPath;

        /*
        ** Spec descriptions.
        */
        describe("Testing the signup service dish validation function", function() {

            beforeEach(function() {
                module('public');
                module('common');

                inject(function ($injector) {
                    ApiPath       = $injector.get('ApiPath');
                    SignupService = $injector.get('SignupService');
                    $httpBackend  = $injector.get('$httpBackend');
                    $timeout      = $injector.get('$timeout');
                });
            });

            /*
            ** The tests.
            */
            it("should recognise valid dish ids", function() {
                var dishIds = ['D18', 'D9', 'SP7', 'D1', 'D10'];
                dishIds.forEach(function (enteredDishId) {
                    validateDishId(enteredDishId);
                    $httpBackend.flush();
                });
            });

            it("should recognise valid lower-case dish ids", function() {
                var dishIds = ['d18', 'd9', 'sp7', 'd1', 'd10'];
                dishIds.forEach(function (enteredDishId) {
                    validateDishId(enteredDishId);
                    $httpBackend.flush();
                });
            });

            it("should recognise mixed-case valid dish ids surrounded by spaces", function() {
                var dishIds = ['    d18 ', '    D9    ', ' sP7 ', '   d1 ', ' D10    '];
                dishIds.forEach(function (enteredDishId) {
                    validateDishId(enteredDishId);
                    $httpBackend.flush();
                });
            });

            it("should accept an empty string as valid", function() {
                var enteredDishId  = '';
                validateDishId(enteredDishId);

                // There should be no HTTP requests sent in this test but
                // promises still need to be flushed.
                $timeout.flush();
            });

            it("should accept a whitespace-only string as valid", function() {
                var enteredDishId  = ' 	  ';
                validateDishId(enteredDishId);

                // There should be no HTTP requests sent in this test but
                // promises still need to be flushed.
                $timeout.flush();
            });

            it("should reject invalid dish ids", function() {
                var dishIds = ['D19', '18D', 'Sesame Chicken', 'Cookie Pie', 'Game of Thrones Box Set'];
                dishIds.forEach(function (enteredDishId) {
                    validateDishId(enteredDishId);
                    $httpBackend.flush();
                });
            });

        });



        /*
        /* Helper functions.
        */
        function validateDishId(enteredDishId) {
            // Clean up the user input.
            var dishId  = SignupService.sanitiseDishId(enteredDishId);

            // HTTP request URL.
            var dishURL = ApiPath + '/menu_items/' + dishId + '.json';

            // Determine if the dish exists in the mock database and set the
            // mock HTTP response accordingly.
            var itemObject = getItem(dishId);
            if (itemObject) {
                $httpBackend
                    .whenGET(dishURL)
                    .respond(itemObject);
            } else {
                $httpBackend
                    .whenGET(dishURL)
                    .respond(500, 'Internal Server Error');
            }

            var promise = SignupService.favDishIsValid(dishId);
            promise
                .then(function(response) {
                    if (itemObject || dishId === '') {
                        expect(response).toBe(true);
                    } else {
                        fail('server sent a success response for a non-existent item.');
                    }
                })
                .catch(function(error) {
                    if (!itemObject) {
                        expect(error.status).not.toBeLessThan(400);
                    } else {
                        fail('server sent a failure response for a valid item.');
                    }
                });
        }

        function getItem(shortName) {
            // Find the item with the given short name.
            // If not found, returns undefined.
            var itemData  = getItems('D');
            var foundItem = itemData.menu_items.find(function (element) {
                return element.short_name === shortName;
            });
            
            return foundItem;
        }

        function getItems(category) {
            var itemData = {
                "menu_items": [{"id":1008,"short_name":"D1","name":"Orange Chicken","description":"chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1009,"short_name":"D2","name":"General Tso's Chicken","description":"chunks of chicken, breaded and deep-fried with sauce and scallions; white meat by request: for pint $1 extra, for large $2 extra","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1010,"short_name":"D3","name":"Sesame Chicken","description":"chunks of chicken, breaded and deep-fried with a sesame seed sauce","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1011,"short_name":"D4","name":"Kung Pao Chicken","description":"diced chicken sauteed with peanuts, and celery in delicious kung pao sauce; white meat by request: for pint $1 extra, for large $2 extra","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1012,"short_name":"D5","name":"Chicken Cashewnuts","description":"diced chicken with waterchestnuts, green peppers, and celery, and cashewnuts; white meat by request: for pint $1 extra, for large $2 extra","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1013,"short_name":"D6","name":"Chicken with Vegetables","description":"white meat chicken in a clear white sauce","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1014,"short_name":"D7","name":"Sweet and Sour Chicken","description":"white meat chicken, breaded and fried with some green pepper, onion, and pineapples","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1015,"short_name":"D8","name":"Beef Broccoli","description":"sliced beef sauteed with broccoli in brown sauce","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1016,"short_name":"D9","name":"Beef with Garlic Sauce","description":"sliced beef sauteed in garlic sauce","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1017,"short_name":"D10","name":"Beef with Fresh Vegetables","description":"sliced beef sauteed with mixed vegetables","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1018,"short_name":"D11","name":"Veal with Fresh Vegetables","description":"sliced veal sauteed with mixed vegetables","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1019,"short_name":"D12","name":"Veal with Garlic Sauce","description":"sliced veal sauteed in garlic sauce","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1020,"short_name":"D13","name":"Hunan Bean Curd","description":"bean curd lightly fried then sauteed with green pepper, snow peas, and water chestnuts in brown sauce","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1021,"short_name":"D14","name":"Bean Curd with Fresh Vegetables","description":"Tofu lightly breaded and fried and sauteed with carrots, broccoli, snow peas, string beans, water chestnuts, and mushrooms in brown sauce","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1022,"short_name":"D15","name":"Mixed Vegetables","description":"broccoli, carrots, baby corn, water chestnuts, mushrooms, and snow peas sauteed in brown sauce","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1023,"short_name":"D16","name":"Eggplant with Garlic Sauce","description":"eggplant sauteed with water chestnuts and string beans in garlic sauce","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1024,"short_name":"D17","name":"Lo Mein","description":"onions, and bean sprouts sauteed with soft lo mein noodles","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1025,"short_name":"D18","name":"Chow Mein","description":"chow mein noodles sauteed with bean sprouts, onions, and celery in brown sauce","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null},
                               {"id":1026,"short_name":"SP7","name":"Chow Mein Super Hot Chef Special","description":"chow mein noodles sauteed with bean sprouts, onions, and celery in brown sauce","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null}],
                "category": {
                    "short_name":"D","name":"Dinner Combo","special_instructions":"Served with your choice of rice (Vegetable Fried RIce, Steamed Rice, Brown Rice), AND EITHER soup (Hot \u0026 Sour, Wonton, Vegetable, Egg Drop, Chicken Corn Soup) OR veggie egg roll."
                }
            };

            return itemData;
        }

    })();

//
// Ends.
//
