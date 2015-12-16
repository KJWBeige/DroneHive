(function() {
	'use strict';

	angular.module('app.routes', [ 'ngRoute' ])
		.config(['$routeProvider', '$locationProvider', jobRoutes])

		function jobRoutes($routeProvider, $locationProvider){
			$routeProvider
					.when('/jobs/new', {
						templateUrl: 'partials/job-form.html',
						controller: 'jobsController',
						controllerAs: 'jobsCtrl'
					})
					.when('/jobs/:jobId', {
						templateUrl: 'partials/job-detail.html',
						controller: 'jobDetailController',
						controllerAs: 'jobDetailCtrl'
					})

		      .when('/:username/jobs', {
		        templateUrl: 'partials/job-list.html',
		        controller: 'jobsController',
		        controllerAs: 'jobsCtrl'
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
