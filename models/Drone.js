var
	mongoose = require('mongoose'),
	Schema = mongoose.Schema

var droneSchema = new Schema({
	rotors: { type: String, required: true},
	company: { type: String, required: true},
	location: String,
	altitude: Number,
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
