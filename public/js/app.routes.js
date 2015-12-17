(function() {
	'use strict';

	angular.module('app.routes', [ 'ngRoute' ])
		.config(['$routeProvider', '$locationProvider', droneRoutes])

		function droneRoutes($routeProvider, $locationProvider){
			$routeProvider
					.when('/drones/new', {
						templateUrl: 'partials/drone-form.html',
						controller: 'dronesController',
						controllerAs: 'dronesCtrl'
					})
					.when('/drones/:droneId', {
						templateUrl: 'partials/drone-detail.html',
						controller: 'droneDetailController',
						controllerAs: 'droneDetailCtrl'
					})

		      .when('/:username/drones', {
		        templateUrl: 'partials/drone-list.html',
		        controller: 'droneController',
		        controllerAs: 'dronesCtrl'
		      })

					// login page
					.when('/login', {
						templateUrl: '/partials/login.html',
						controller: 'mainController',
						controllerAs: 'login'
					})
					.when('/signup', {
						templateUrl: '/partials/signup.html',
						controller: 'userCreateController',
						controllerAs: 'signup'
					})
					// show all users
					.when('/users', {
						templateUrl: 'partials/allUsers.html',
						controller: 'userController',
						controllerAs: 'user'
					})
					.when('/', {
						templateUrl: 'partials/homepage.html',
						controller: 'mainController',
						controllerAs: 'main'
					})
		      .otherwise({
		        redirectTo: '/'
		      });

				// $locationProvider.html5Mode(true)
		}
	}());
