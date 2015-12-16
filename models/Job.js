var
	mongoose = require('mongoose'),
	Schema = mongoose.Schema

var jobSchema = new Schema({
	title: { type: String, required: true},
	company: { type: String, required: true},
	location: String,
	description: String,
	link: String,
	contact: String,
	phone: String,
	notes: String,
	owner: String,
	resumeDate: String,
	recentUpdate: String,
	updateNotes: String
})

var Job = mongoose.model('Job', jobSchema)

module.exports = Job
