(function () { //Start IIFE
'use strict'; //Don't let me get away with NUFFIN!

//---------------------------------------------------------------------------//
//Define controllers and Services >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//---------------------------------------------------------------------------//
/*
	angular.module(name, [requires], [configFn]);
	
	name = The name of the module to create or retrieve. (string)
	
	requires = If specified then new module is being created. If unspecified 
	then the module is being retrieved for further configuration. 
	(!Array.<string>=)

	configFn = Optional configuration function for the module. Same as 
	Module#config().
*/
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
//---------------------------------------------------------------------------//
//End Define Controllers and Services <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//---------------------------------------------------------------------------//

//----------------------------------------------------------------------//
//Perform Injections >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//----------------------------------------------------------------------//
ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
//----------------------------------------------------------------------//
//End Perform Injections <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//----------------------------------------------------------------------//


//------------------------------------------------//
//Declare Services >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//------------------------------------------------//
function ShoppingListCheckOffService() {
	//---------//
	//Variables//
	//---------//
	var checkService = this; //Using "checkService" instead of "this". Just for aesthetics.
	var boughtItems = []; //Variable to store items that have been bought.
	var toBuyItems = [{name: "sodas", quantity: 10}, //Variable with preloaded items to buy.
    	{name: "candies", quantity: 10},
    	{name: "sugars", quantity: 10},
    	{name: "beans", quantity: 10},
    	{name: "cereals", quantity: 10}
	];

	//---------//
	//Functions//
	//---------//

	/* sendBuyItems() returns our list of items in the service to outside functions */
	checkService.sendBuyItems = function() {
		return toBuyItems;
	}

	/* sendBoughtItems() returns our list of items that were bought */
	checkService.sendBoughtItems = function() {
		return boughtItems;
	}

	/* listSwap moves an item from the unbought to the bought list/array */
	checkService.listSwap = function(index) {
		boughtItems.push(toBuyItems[index]);
		toBuyItems.splice(index, 1);
	}
}
//------------------------------------------------//
//End Declare Services <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//------------------------------------------------//


//-------------------------------------------------------------------------------//
//Declare Controllers >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//-------------------------------------------------------------------------------//

//Declare ToBuyShoppingController and pass it our service as an argument.
//This allows us to use variables and functions from ShoppingListCheckOffService.
function ToBuyShoppingController(ShoppingListCheckOffService) {
	var buyController = this; //Refer to "this" as buyController.

	//Get the "To Buy" list from our service
	//toBuyItems will be set to the value of sendBuyItems in ShoppingListCheckOffService
	buyController.toBuyItems = ShoppingListCheckOffService.sendBuyItems();

	//Use the "listSwap" function provided by our service.
	//moveItems will be the publicly access point for listSwap function in our service.
	//Angular will pass $index from our html, this is where "index" comes from.
	buyController.moveItems = function(index) {
		ShoppingListCheckOffService.listSwap(index);
	}
}

//Declare AlreadyBoughtShoppingController and pass it our service as an argument.
//This allows us to use variables and functions from ShoppingListCheckOffService.
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
	var boughtController = this; //We will refer to "this" as boughtController

	//boughtItems will be set to the data returned from sendBoughtItems in our service.
	boughtController.boughtItems = ShoppingListCheckOffService.sendBoughtItems();
}
//-------------------------------------------------------------------------------//
//End Declare Controllers <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//-------------------------------------------------------------------------------//

})(); //End IIFE