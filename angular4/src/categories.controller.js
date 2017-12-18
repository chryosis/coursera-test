(function () {
	'use strict';
	angular.module('MenuApp') //Access MenuApp module created in menuapp.module.js
	.controller('CategoriesController', CategoriesController); //Create CategoriesController
	
	CategoriesController.$inject = ['categories'] //Inject CategoriesController with 'categories' from .state('categories', {resolve{}}) in routes.js
	
	function CategoriesController(categories) { //Define CategoriesController and pass it categories injected from the previous step.
		var categoriesCtrl = this; //Refer to "this" as categoriesCtrl
		categoriesCtrl.categories = categories; //Set up the internal categories variable to store injected categories.
}
})();
