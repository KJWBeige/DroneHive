(function() {
	'use strict';
	angular.module('drones', [])
		.directive('navBar', navBar)
		.directive('droneForm', droneForm)
		.filter('reverse', reverse)


	function reverse() {
		return function(items) {
			return items.slice().reverse();
		};
	}

	function droneForm(){
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/drone-form.html'
		}
		return directive
	}

	function navBar(){
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/nav.html',
			transclude: true
		}
		return directive
	}
}());
