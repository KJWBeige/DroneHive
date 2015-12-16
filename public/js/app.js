angular.module('jobsApp', ['ngAnimate', 'app.routes', 'mainCtrl', 'userCtrl', 'userService','authService', 'jobsCtrl','jobs', 'jobsFactory'])
  // integrate token into requests
  .config(function($httpProvider) {
  	// attach auth interceptor
    $httpProvider.interceptors.push('AuthInterceptor')
  });
