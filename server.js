var
	express = require('express'),
	app = express(),
	ejs = require('ejs'),
	logger = require('morgan'),
	path = require('path'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	apiRoutes = require('./routes/api.js')

mongoose.connect('mongodb://localhost/jobs', function(err){
	if(err) throw err
	console.log('Connected to MongoDB')
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
