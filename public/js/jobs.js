(function() {
	'use strict';
	angular.module('jobs', [])
		.directive('navBar', navBar)
		.directive('jobForm', jobForm)
		.filter('reverse', reverse)


	function reverse() {
		return function(items) {
			return items.slice().reverse();
		};
	}

	function jobForm(){
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/job-form.html'
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
