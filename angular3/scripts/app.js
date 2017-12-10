(function() {
  'use strict';
  angular
  .module('NarrowItDownApp', []) //ng-app="NarrowItDownApp"
  .controller('NarrowItDownController', NarrowItDownController) //ng-controller="NarrowItDownController as ctrl"
  .service('MenuSearchService', MenuSearchService) //Search menu and filter results, return filtered results.
  .directive('foundItems', FoundItemsDirective); //<found-items found="ctrl.items" on-remove="ctrl.removeItem(index)"></found-items>

  //Directive
  function FoundItemsDirective() {
    var ddo = { //Directive Definition Object
      templateUrl: 'foundItems.html', //foundItems.html will be embedded into index.html and display our search results.
      scope: {
        found: '<', //<found-items found="ctrl.items"></found-items>
        onRemove: '&' //<found-items on-remove="ctrl.removeItem(index)"></found-items>
      },
      controller: FoundItemsDirectiveController, //Controller for foundItems.html
      controllerAs: 'list', //Refer to controller in foundItems.html as "list" -> FoundItemsDirectiveController
      bindToController: true //Our scope will be bound to FoundItemsDirectiveController
    };
    return ddo; //Function returns ddo.
  }

  //Controller
  //Returns true if list is empty.
  function FoundItemsDirectiveController() {
    var list = this;

    list.isEmpty = function() {
      return list.found != undefined && list.found.length === 0;
    }
  }

  //NarrowItDownController needs to use MenuSearchService, so we inject it.
  NarrowItDownController.$inject = ['MenuSearchService'];

  //Controller
  function NarrowItDownController(MenuSearchService) {
    var controller = this; //Refer to this controller as "controller"

    controller.searchTerm = ""; //Variable stores user search string.

    controller.narrowIt = function() {
      if (controller.searchTerm === "") { //If the search string is empty ->
        controller.items = []; //Set the items array to empty
        return; //Abort
      }

      //Attempt to store the result of getMatchedMenuItems in promise, passing it our search string.
      var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
      promise.then(function(response) { //If we were able to get the menu items
        controller.items = response; //Then store the result in the items array.
      })
      //If an error occurs, log it to the console.
      .catch(function(error) {
        //"Something went wrong, <insert error here>"
        console.log("Something went wrong", error);
      });
    };

    //This will be attached to our button.
    //Each button will have an index passed to it:
    //ng-click="list.onRemove({index: $index});"
    //Our local "index" will be set to the $index of ng-repeat.
    controller.removeItem = function(index) {
      controller.items.splice(index, 1);
    };
  }

  //MenuSearchService needs $http, so inject it.
  MenuSearchService.$inject = ['$http'];

  //MenuSearchService gets the menu_items json, then returns only items that were part of our search.
  function MenuSearchService($http) {
    var service = this; //Refer to "this" as service.

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      }).then(function (result) {
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
