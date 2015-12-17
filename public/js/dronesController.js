(function(){

	// add both controllers to the main app module

	angular.module('dronesCtrl', [])
		.controller('dronesController', dronesController)
		.controller('droneDetailController', droneDetailController)

	// both controllers will use our 'drones' factory, so we'll inject it in both accordingly

	dronesController.$inject = ['drones', '$window', '$timeout', '$routeParams', '$location']
	droneDetailController.$inject = ['drones','$routeParams','$location']

	function dronesController(drones, $window, $timeout, $routeParams, $location){
		var self = this
		self.name = 'drone List'
		self.api = drones
		self.drones = []
		// this array will contain the full list of drones when it is retrieved from DB

		// represents a 'new drone' we'd like to POST to the database
		self.newDrone = {}

		// retrieve the list of drones, and set this controller's 'drones' property to the array we get back from our API
		self.getDrone = function(username) {
			self.api.list(username).success(function(response){
				self.drones = response
			})
		}
		self.getDrone($routeParams.username)


		// controller method for adding a new drone, this gets invoked when user hits 'submit' button.
		self.addDrone = function(title,company,location, description, link, contact, phone, notes, resumeDate, recentUpdate, updateNotes, owner){
			var data = {title: title, company: company, location: location, description: description, link: link, contact: contact, phone: phone, notes: notes, resumeDate: resumeDate, recentUpdate: recentUpdate, updateNotes: updateNotes, owner: owner}
			// run the drone factory's addDrone method to send the POST request with the data object we just created
			self.api.addDrone(data).then(function success(response){
				// when we successfully finish the POST request, take the server's response (the new drone) and add it to this controller's drone list, which updates the front-end with the new drone.
				// clear this controller's 'newDrone' object out, which clears the input fields on the front-end
				self.newDrone = {}
				$location.path('/drones/' + response.data.drone._id)

				// focus on the first input field for the user to add another drone (UI enhancement)
				// $window.document.querySelectorAll('#new-drone-form input')[0].focus()
			})
		}
	}

	function droneDetailController(drones,$routeParams,$location){
		var self = this
		self.name = 'drone Detail'
		self.api = drones
		self.drone = null

		// default boolean value, which we can toggle true/false for showing/hiding job edit form
		self.editing = false
		self.status = false


		// retrieve a drone based on the url parameter for droneId, then set this controller's 'drone' property to the response to show it on the front-end
		self.showDrone = function(droneId){
			self.api.show(droneId).success(function(response){
				self.drone = response
			})
		}
		self.showDrone($routeParams.droneId)

		// update the drone using the factory's updateDrone method, then on successful PATCH, set this controller's drone object to the response from the server, which updates the front-end. Then, turn this controller's 'editing' property to false, which toggles back to show the drone details without the edit form.
		self.updateDrone = function(droneId,title,company,location, description, link, contact, phone, notes, viewDate, recentUpdate, updateNotes){

				var data = {title: title, company: company, location: location, description: description, link: link, contact: contact, phone: phone, notes: notes, viewDate: viewDate, recentUpdate: recentUpdate, updateNotes: updateNotes}
			self.api.updateDrone(droneId,data).success(function(response){
				self.drone = response
				self.editing = false
				self.status = false
			})
		}

		// method that runs the drone factory's removeDrone method to delete the drone using this controller's drone's _id property as the argument. Then, after successfully deleting, redirect the user back to '/drones'.
		self.removeDrone = function(droneId,username){
			self.api.removeDrone(droneId).success(function(response){
				$location.path('/'+username+'/drones')
			})
		}
	}
}())