(function() {
	'use strict';

	angular.module('MenuApp') //Access MenuApp module created in menuapp.module.js
	.component('items', { //Declare a component "items".
		templateUrl: 'src/itemscomponent.template.html',
		bindings: {
			items: '<'
		}
	});

})();
