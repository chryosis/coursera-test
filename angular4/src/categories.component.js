(function() {
	'use strict';
	angular.module('MenuApp') //Access MenuApp module created in menuapp.module.js
	.component('categories', { //.component('name', {configurations})
		templateUrl: 'src/categoriescomponent.template.html',
		bindings: {
			items: '<'
		}
	});
})();
