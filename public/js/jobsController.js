(function(){

	// add both controllers to the main app module

	angular.module('jobsCtrl', [])
		.controller('jobsController', jobsController)
		.controller('jobDetailController', jobDetailController)

	// both controllers will use our 'jobs' factory, so we'll inject it in both accordingly

	jobsController.$inject = ['jobs', '$window', '$timeout', '$routeParams', '$location']
	jobDetailController.$inject = ['jobs','$routeParams','$location']

	function jobsController(jobs, $window, $timeout, $routeParams, $location){
		var self = this
		self.name = 'job List'
		self.api = jobs
		self.jobs = []
		// this array will contain the full list of jobs when it is retrieved from DB

		// represents a 'new job' we'd like to POST to the database
		self.newJob = {}

		// retrieve the list of jobs, and set this controller's 'jobs' property to the array we get back from our API
		self.getJob = function(username) {
			self.api.list(username).success(function(response){
				self.jobs = response
			})
		}
		self.getJob($routeParams.username)


		// controller method for adding a new job, this gets invoked when user hits 'submit' button.
		self.addJob = function(title,company,location, description, link, contact, phone, notes, resumeDate, recentUpdate, updateNotes, owner){
			var data = {title: title, company: company, location: location, description: description, link: link, contact: contact, phone: phone, notes: notes, resumeDate: resumeDate, recentUpdate: recentUpdate, updateNotes: updateNotes, owner: owner}
			// run the job factory's addJob method to send the POST request with the data object we just created
			self.api.addJob(data).then(function success(response){
				// when we successfully finish the POST request, take the server's response (the new job) and add it to this controller's job list, which updates the front-end with the new job.
				// clear this controller's 'newJob' object out, which clears the input fields on the front-end
				self.newJob = {}
				$location.path('/jobs/' + response.data.job._id)

				// focus on the first input field for the user to add another job (UI enhancement)
				// $window.document.querySelectorAll('#new-job-form input')[0].focus()
			})
		}
	}

	function jobDetailController(jobs,$routeParams,$location){
		var self = this
		self.name = 'job Detail'
		self.api = jobs
		self.job = null

		// default boolean value, which we can toggle true/false for showing/hiding job edit form
		self.editing = false
		self.status = false


		// retrieve a job based on the url parameter for jobId, then set this controller's 'job' property to the response to show it on the front-end
		self.showJob = function(jobId){
			self.api.show(jobId).success(function(response){
				self.job = response
			})
		}
		self.showJob($routeParams.jobId)

		// update the job using the factory's updateJob method, then on successful PATCH, set this controller's job object to the response from the server, which updates the front-end. Then, turn this controller's 'editing' property to false, which toggles back to show the job details without the edit form.
		self.updateJob = function(jobId,title,company,location, description, link, contact, phone, notes, resumeDate, recentUpdate, updateNotes){

				var data = {title: title, company: company, location: location, description: description, link: link, contact: contact, phone: phone, notes: notes, resumeDate: resumeDate, recentUpdate: recentUpdate, updateNotes: updateNotes}
			self.api.updateJob(jobId,data).success(function(response){
				self.job = response
				self.editing = false
				self.status = false
			})
		}

		// method that runs the job factory's removeJob method to delete the job using this controller's job's _id property as the argument. Then, after successfully deleting, redirect the user back to '/jobs'.
		self.removeJob = function(jobId,username){
			self.api.removeJob(jobId).success(function(response){
				$location.path('/'+username+'/jobs')
			})
		}
	}
}())
