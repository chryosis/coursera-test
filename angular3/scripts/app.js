(function() {
	'use strict';
	
	//Declare module, controller, service, and directive
	angular
		.module('NarrowItDownApp', []) //ng-app="NarrowItDownApp"
		.controller('NarrowItDownController', NarrowItDownController) //ng-controller="NarrowItDownController as ctrl"
		.service('MenuSearchService', MenuSearchService) //return JSON items
		.directive('foundItems', FoundItemsDirective); //Declare DDO, scope, and FoundItemsDirectiveController, html: <found-items>

	function FoundItemsDirective() {
		var ddo = {
			templateURL: 'foundItems.html',
			scope: {
				found: '<', //HTML: found="ctrl.items" one way binding to the items array.
				onRemove: '&' //HTML: ng-click="list.onRemove({index: $index});" Selects index of what we want to remove.
			},
			controller: FoundItemsDirectiveController, //Set the controller for this directive to FoundItemsDirectiveController
			controllerAs: 'list', //Refer to controller with list.*
			bindToController: true //Bind to the controller
		};
		return ddo;
	}

	function FoundItemsDirectiveController() { //Used in FoundItemsDirective... controller: FoundItemsDirectiveController
		var list = this;

		list.isEmpty = function () {
			return list.found != undefined && list.found.length === 0;
		}
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var controller = this;

		controller.searchTerm = "";

		controller.narrowIt = function () {
			if (controller.searchTerm === "") {
				controller.items = [];
				return;
			}
			var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
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

	MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http) {
		var service = this;

		service.getMatchedMenuItems = function(searchTerm) {
        return $http({
          method: 'GET',
          url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
        }).then(function (result) {
        // process result and only keep items that match
        var items = result.data.menu_items;

        var foundItems = [];

        for (var i = 0; i < items.length; i++) {
          if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
            foundItems.push(items[i]);
          }
        }

        // return processed items
        return foundItems;
      });
    };
  }

}
)();
