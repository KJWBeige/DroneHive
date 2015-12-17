angular.module('dronesApp', ['ngAnimate', 'app.routes', 'mainCtrl', 'userCtrl', 'userService','authService', 'dronesCtrl','drones', 'dronesFactory'])
  // integrate token into requests
  .config(function($httpProvider) {
  	// attach auth interceptor
    $httpProvider.interceptors.push('AuthInterceptor')
  });
