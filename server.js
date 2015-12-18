var
	express = require('express'),
	app = express(),
	ejs = require('ejs'),
	logger = require('morgan'),
	path = require('path'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	apiRoutes = require('./routes/api.js')

mongoose.connect('mongodb://KJWBeige:Stanford2003@ds033145.mongolab.com:33145/dronehive', function(err){     // To run locally =>  'mongodb://localhost/drones'
	if(err) throw err
	console.log('Connected to MongoDB')   //'mongodb://<KJWBeige>:<Stanford2003>@ds033145.mongolab.com:33145/dronehive'
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

app.listen(3000, function(){
	console.log('Server Listening on port 3000...')
})
