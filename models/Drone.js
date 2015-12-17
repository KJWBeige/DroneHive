var
	mongoose = require('mongoose'),
	Schema = mongoose.Schema

var droneSchema = new Schema({
	title: { type: String, required: true},
	company: { type: String, required: true},
	location: String,
	description: String,
	link: String,
	contact: String,
	phone: String,
	notes: String,
	owner: String,
	viewDate: String,
	recentUpdate: String,
	updateNotes: String
})

var Drone = mongoose.model('Drone', droneSchema)

module.exports = Drone
