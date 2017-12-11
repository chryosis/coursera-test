//Start IIFE
(function () {
	//Be strict about it.
	'use strict';

	//Add MenuDataService to the data module.
	angular.module('data')
	.service('MenuDataService', MenuDataService);

	//Inject $http into MenuDataService
	MenuDataService.$inject = ['$http']

	//MenuDataService
	function MenuDataService($http) {
		//Refer to this as service
		var service = this;

		//getAllCategories
		service.getAllCategories = function () {
			//Get categories from categories.json
			return $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/categories.json'
			});
		}

		//getItemsForCategory
		service.getItemsForCategory = function(categoryShortName) {
			//Get items from menu_items.json
			return $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
				params: {category: categoryShortName}
			});
		}
	}
})();
//END IIFE