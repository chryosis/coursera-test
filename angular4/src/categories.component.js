//Start IIFE
(function () {
	//Be strict about it.
	'use strict';

	angular.module('MenuApp')
	.component('categories', {
		templateUrl: 'src/categoriescomponent.template.html',
		bindings: {
			items: '<'
		}
	});
})();
//End IIFE