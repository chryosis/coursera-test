(function () { //Start IIFE
'use strict'; //BE OCD ABOUT IT.

	//Angular declarations
	angular
		.module('NarrowItDownApp', []) //Attribute ng-app in index.html
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.directive('foundItems', FoundItemsDirective);

	//Injections
	NarrowItDownController.$inject = ['MenuSearchService'];
	MenuSearchService.$inject = ['$http'];

	//Controllers
	function NarrowItDownController(MenuSearchService) {
		var controller = this;
		controller.searchString = "";

		controller.narrowIt = function() {
			if (controller.searchString === "") {
				controller.items = [];
				return;
			}

			var promise = MenuSearchService.getMatchedMenuItems(controller.searchString);
			
			promise.then(function(response) {
				controller.items = response;
			})
			.catch(function(error) {
				console.log("Something went wrong", error);
			});
		};

		controller.removeItem = function(index) {
			controller.items.splice(index, 1);
		};
	}

	function FoundItemsDirectiveController() {
	    var list = this;

	    list.isEmpty = function() {
	    	return list.found != undefined && list.found.length === 0;
	    }
	}
	//Services
	function MenuSearchService($http) {
		var service = this;

		service.getMatchedMenuItems = function(search) {
			return $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
			})
			.then(function(result) {
				var unfilteredItems = result.data.menu_items;
				var filteredItems = [];

				for (var i = 0; i < unfilteredItems.length; i++) {
					if (unfilteredItems[i].description.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
						filteredItems.push(unfilteredItems[i]);
					}
				}

				return filteredItems;
			});
		};
	}

	//Directive
	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				found: '<',
				onRemove: '&'
			},
			controller: FoundItemsDirectiveController,
			controllerAs: 'list',
			bindToController: true
		};
		return ddo;
	}
})(); //END IIFE