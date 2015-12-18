var
	express = require('express'),
	app = express(),
	ejs = require('ejs'),
	logger = require('morgan'),
	path = require('path'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	apiRoutes = require('./routes/api.js'),
	db = process.env.MONGOLAB_URI || 'mongodb://KJWBeige:Stanford2003@ds033145.mongolab.com:33145/dronehive'

mongoose.connect(db, function(err){     // To run locally =>  'mongodb://localhost/drones'
	if(err) throw err
	console.log('Connected to MongoDB')   //mongodb://KJWBeige:Stanford2003@ds033145.mongolab.com:33145/dronehive'
})

app.set('view engine', 'ejs')

app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req,res){
	res.render('index')
})

app.use('/api', apiRoutes)

var port = process.env.PORT || 3000

app.listen(port, function(){
	console.log('Server listening on port:'+ port)
})
