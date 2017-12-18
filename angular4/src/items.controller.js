(function () {
	'use strict';

	angular.module('MenuApp') //Access MenuApp module created in menuapp.module.js
	.controller('ItemsController', ItemsController); //Create "ItemsController"

	ItemsController.$inject = ['items'] //Inject ItemsController with 'items' from .state('items', {resolve{}}) in routes.js
	
	function ItemsController(items) { //Define ItemsController and pass it items injected from the previous step.
	var itemsCtrl = this; //Refer to this private variable as itemsCntrl
	itemsCtrl.items = items; //Set our private variable to items.
}

})();
