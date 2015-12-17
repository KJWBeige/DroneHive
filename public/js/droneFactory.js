(function() {
	'use strict';

	angular.module('dronesFactory', [])
		.factory('drones', drones)

	drones.$inject = ['$http']

	// drones factory
	function drones($http){
		var dronesUrl = '/api/drones'
		var drones = {}

		drones.list = function(username){
			return $http.get('/api/'+username+'/drones')
		}

		drones.show = function(droneId){
			return $http.get(dronesUrl + '/' + droneId)
		}

		drones.addDrone = function(data){
			return $http.post(dronesUrl, data)
		}

		drones.updateDrone = function(droneId,data){
			return $http.patch(dronesUrl + '/' + droneId, data)
		}

		drones.removeDrone = function(droneId){
			return $http.delete(dronesUrl + '/' + droneId)
		}

		return drones
	}

}());
