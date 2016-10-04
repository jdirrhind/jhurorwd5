/* File: menudata.service.js
 * Service definition.
 */
(
    function() {
        'use strict';
        
        angular.module('data')
            .service('MenuDataService', MenuDataService);

        MenuDataService.$inject = ['DataConfig', '$timeout', '$q', '$http'];
        function MenuDataService(DataConfig, $timeout, $q, $http) {
            var service = this;
            var TIMEOUT = 200;

            /* 
            ** Publicly visible service functions.
            */
            service.getAllCategories    = getAllCategories;
            service.getItemsForCategory = getItemsForCategory;

            // Implementation details.
            function getAllCategories() {
                // This method returns a promise which will resolve to a list
                // of menu categories sourced from the restaurant menu REST
                // API.

                // Make the asynchronous Call to the data server, returning
                // the call's promise.
                var request = {
                    method: 'GET',
                    url:    (DataConfig.MenuServerURL + DataConfig.CategoryPath)
                };
                var promise = $http(request)
                    .then(
                        function(response) {
                            return response.data;
                        }
                    );

                return promise;
            }

            function getItemsForCategory(categoryShortName) {
                // Returns a promise which will resolve to a list of items
                // corresponding to the given category short name, sourced
                // from the restaurant menu REST API.

                // Make the asynchronous Call to the data server, returning
                // the call's promise.
                var request = {
                    method: 'GET',
                    url:    (DataConfig.MenuServerURL + DataConfig.ItemsPath),
                    params: {
                        category: categoryShortName
                    }
                };
                var promise = $http(request)
                    .then(
                        function(response) {
                            return response.data;
                        }
                    );
                
                return promise;
            }

            // Private functions.
            // Used during development when away from the internet.
            // Kept for posterity. Ignore these.
            function _getAllCategories() {
                // This method returns a promise which will resolve to a list
                // of menu categories sourced from the restaurant menu REST
                // API.
                var defer = $q.defer();

                // Simulated server fetch...
                $timeout(function () {
                    defer.resolve(_getDummyCategories());
                }, TIMEOUT);

                return defer.promise;
            }

            function _getItemsForCategory(categoryShortName) {
                // Returns a promise which will resolve to a list of items for
                // the given category, sourced from the restaurant menu REST
                // API.
                var defer = $q.defer();

                // Simulated server fetch...
                $timeout(function () {
                    defer.resolve(_getDummyItems(categoryShortName));
                }, TIMEOUT);

                return defer.promise;
            }

            function _getDummyCategories() {
                console.log('Simulating call to ', DataConfig.MenuServerURL + DataConfig.CategoryPath);
                var categoryData = [
                    {"id":81,"short_name":"L","name":"Lunch","special_instructions":"Sunday-Friday 11:15am-3:00pm. Served with your choice of rice (Vegetable Fried RIce, Steamed Rice, Brown Rice), AND EITHER soup (Hot \u0026 Sour, Wonton, Vegetable, Egg Drop, Chicken Corn Soup) OR veggie egg roll. $1.00 extra to have both soup and egg roll.","url":"https://davids-restaurant.herokuapp.com/categories/81.json"},
                    {"id":82,"short_name":"A","name":"Soup","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/82.json"},
                    {"id":83,"short_name":"B","name":"Appetizers","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/83.json"},
                    {"id":84,"short_name":"SP","name":"Chef's Recommendations","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/84.json"},
                    {"id":85,"short_name":"C","name":"Chicken","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/85.json"},
                    {"id":86,"short_name":"F","name":"Beef","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/86.json"},
                    {"id":87,"short_name":"V","name":"Veal","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/87.json"},
                    {"id":88,"short_name":"DK","name":"Duck","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/88.json"},
                    {"id":89,"short_name":"VG","name":"Vegetables","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/89.json"},
                    {"id":90,"short_name":"CU","name":"Curry","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/90.json"},
                    {"id":91,"short_name":"NL","name":"Noodles (Lo Mein)","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/91.json"},
                    {"id":92,"short_name":"NF","name":"Mei Fan (Very Fine Noodles)","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/92.json"},
                    {"id":93,"short_name":"PF","name":"Pan Fried Noodles","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/93.json"},
                    {"id":94,"short_name":"FR","name":"Fried Rice","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/94.json"},
                    {"id":95,"short_name":"CM","name":"Chow Mein","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/95.json"},
                    {"id":96,"short_name":"FY","name":"Egg Foo Young","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/96.json"},
                    {"id":97,"short_name":"SO","name":"Side Orders","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/97.json"},
                    {"id":98,"short_name":"DS","name":"Desserts","special_instructions":"","url":"https://davids-restaurant.herokuapp.com/categories/98.json"},
                    {"id":99,"short_name":"D","name":"Dinner Combo","special_instructions":"Served with your choice of rice (Vegetable Fried RIce, Steamed Rice, Brown Rice), AND EITHER soup (Hot \u0026 Sour, Wonton, Vegetable, Egg Drop, Chicken Corn Soup) OR veggie egg roll.","url":"https://davids-restaurant.herokuapp.com/categories/99.json"},
                    {"id":100,"short_name":"SR","name":"Sushi Menu","special_instructions":"Contains raw ingredients. Consuming raw or undercooked meat, poultry, or seafood may increase your risk of food borne illness.","url":"https://davids-restaurant.herokuapp.com/categories/100.json"}
                ];

                return categoryData;
            }

            function _getDummyItems(category) {
                console.log('Simulating call to ', DataConfig.MenuServerURL + DataConfig.ItemsPath);
                console.log('with category parameter: ', category);

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
                                   {"id":1025,"short_name":"D18","name":"Chow Mein","description":"chow mein noodles sauteed with bean sprouts, onions, and celery in brown sauce","price_small":null,"price_large":13.95,"small_portion_name":null,"large_portion_name":null}],
                    "category": {
                        "short_name":"D","name":"Dinner Combo","special_instructions":"Served with your choice of rice (Vegetable Fried RIce, Steamed Rice, Brown Rice), AND EITHER soup (Hot \u0026 Sour, Wonton, Vegetable, Egg Drop, Chicken Corn Soup) OR veggie egg roll."
                    }
                };

                // Prepend the following extra item to provide some kind of variation in the test data.
                var extraItem = {"id":1000,"short_name":"ZZ","name":"Category " + category + " Menu Item","description":"Dummy item placed on the front of the items list for variation.","price_small":null,"price_large":99.95,"small_portion_name":null,"large_portion_name":null};
                itemData.menu_items.unshift(extraItem);

                return itemData;
            }
        }
    }
)();

//
// Ends.
//
