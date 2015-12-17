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
		self.addDrone = function(rotors,company,location,altitude, description, link, contact, phone, notes, viewDate, recentUpdate, updateNotes, owner){
			var data = {rotors: rotors, company: company, location: location, altitude: altitude, description: description, link: link, contact: contact, phone: phone, notes: notes, viewDate: viewDate, recentUpdate: recentUpdate, updateNotes: updateNotes, owner: owner}
			// run the drone factory's addDrone method to send the POST request with the data object we just created
			console.log(data)
			self.api.addDrone(data).then(function success(response){
				// when we successfully finish the POST request, take the server's response (the new drone) and add it to this controller's drone list, which updates the front-end with the new drone.
				// clear this controller's 'newDrone' object out, which clears the input fields on the front-end
				self.newDrone = {}
				$location.path('/drones/' + response.data.drone._id)

				// focus on the first input field for the user to add another drone (UI enhancement)
				// $window.document.querySelectorAll('#new-drone-form input')[0].focus()
			})
		}
		// below is to use D3 for displaying the altitude data in bar chart form
		d3.json('/api/Kevin/drones', function(error, data){
			var altitudes = []
  			if(error) throw error
 		 	console.log(data)
			//altitudes = [260, 140, 230]
			// using map
			altitudes = data.map(function(drone){
				return drone.altitude
			})
			console.log(altitudes)
			
			//Width and height
			var w = 500
			var h = 100
			
			var svg = d3.select("div.chart-goes-here") //selecting entire div from D3
						.append("svg") //appending SVG to the body
						.attr("width", w) //setting the width of the svg
						.attr("height", h) //setting the height of the svg
			svg.selectAll("rect")
				.data(altitudes) //set the data source to be the array of altitudes
				.enter() //entering the data set to drill
				.append("rect") //appending a rectangle for each altitude
				.attr("x", function(d, i){
				 	return i*(w/altitudes.length)
				}) //initial set of x axis
				.attr("y",0) //initial set of y axis
				.attr("width", 20) //initial width of the rectangle
				.attr("height", function(d, i){
					return d/10
				}) //inital height of the rectangle		
		})
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
		self.updateDrone = function(droneId,rotors,company,location, altitude, description, link, contact, phone, notes, viewDate, recentUpdate, updateNotes){

				var data = {rotors: rotors, company: company, location: location, altitude: altitude, description: description, link: link, contact: contact, phone: phone, notes: notes, viewDate: viewDate, recentUpdate: recentUpdate, updateNotes: updateNotes}
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
