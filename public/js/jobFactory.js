(function() {
	'use strict';

	angular.module('jobsFactory', [])
		.factory('jobs', jobs)

	jobs.$inject = ['$http']

	// jobs factory
	function jobs($http){
		var jobsUrl = '/api/jobs'
		var jobs = {}

		jobs.list = function(username){
			return $http.get('/api/'+username+'/jobs')
		}

		jobs.show = function(jobId){
			return $http.get(jobsUrl + '/' + jobId)
		}

		jobs.addJob = function(data){
			return $http.post(jobsUrl, data)
		}

		jobs.updateJob = function(jobId,data){
			return $http.patch(jobsUrl + '/' + jobId, data)
		}

		jobs.removeJob = function(jobId){
			return $http.delete(jobsUrl + '/' + jobId)
		}

		return jobs
	}

}());
