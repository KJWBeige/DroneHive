(function() {
  'use strict';
  //create angular module for auth service
  angular.module('authService', [])
  // create a function to export for your service
  .factory('AuthToken', AuthToken)
  .factory('Auth', Auth)
  .factory('AuthInterceptor', AuthInterceptor)

  function Auth( $http, $q, AuthToken ){
    var authFactory = {}
    authFactory.login = function(username, password){
        return $http.post('/api/authenticate', {
            username: username,
            password: password
        })
        .success(function(data){
            AuthToken.setToken(data.token)
            return data
        })
    }
    authFactory.logout = function(){
        AuthToken.setToken()
    }
    authFactory.isLoggedIn = function(){
        if ( AuthToken.getToken() )
            return true
        else
            return false
    }
    authFactory.getUser = function(){
        if ( AuthToken.getToken() )
            return $http.get('/api/me')
        else
            return $q.reject({message: 'User has no token'})

    }
    return authFactory
  }

  function AuthInterceptor( $q, AuthToken, $location){
    var authIntercept = {}

    authIntercept.request = function(config){
        var token = AuthToken.getToken()

        if ( token ){
            config.headers['x-access-token'] = token

        }

        return config
    }
    authIntercept.responseError = function(response){
        if ( response.status == 403 )
            $location.path('/login')

        return $q.reject(response)
    }

    return authIntercept
  }

  function AuthToken( $window ) {
    var authTokenFactory = {}
    //get the token out of local storage
    authTokenFactory.getToken = function(){
      return $window.localStorage.getItem('token')
    }
    authTokenFactory.setToken = function(token){
        if ( token )
            $window.localStorage.setItem('token', token)
        else
            $window.localStorage.removeItem('token')
    }

    return authTokenFactory
  }
}());
