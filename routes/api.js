var
	express 	 	= require('express'),
	apiRouter  	= express.Router(),
	mongoose 	 	= require('mongoose'),
	Job 			 	= require('../models/job.js'),
	User 			 	= require('../models/user.js'),
	jwt        	= require('jsonwebtoken'),
	superSecret	= 'frijoles'

apiRouter.get('/', function(req,res){
	res.json({message: "Api routes are working."})
})

// api endpoint to get user information


apiRouter.route('/jobs')
	.get(function(req,res) {
		res.json({message: "get jobs"})
	})
	.post(function(req,res){
		var newJob = new Job()
		newJob.title = req.body.title
		newJob.company = req.body.company
		newJob.location = req.body.location
		newJob.description = req.body.description
		newJob.link = req.body.link
		newJob.contact = req.body.contact
		newJob.phone = req.body.phone
		newJob.notes = req.body.notes
		newJob.owner = req.body.owner
		newJob.resumeDate = req.body.resumeDate
		newJob.recentUpdate = req.body.recentUpdate
		newJob.updateNotes = req.body.updateNotes
		newJob.save(function(err, job){
			if(err) throw err
			res.json({message: "Job Saved!", job: job})
		})
	})

apiRouter.route('/jobs/new')
	.get(function(req,res) {
		res.json({message: "Create a new job entry!"})
	})

	apiRouter.route('/:username/jobs')
		.get(function(req,res){
			Job.find({owner: req.params.username}, function(err, jobs){
				res.json(jobs)
			})
		})

apiRouter.route('/jobs/:id')
	.get(function(req,res){
		Job.findById(req.params.id, function(err,job){
			if(err) throw err
			res.json(job)
		})
	})
	.patch(function(req,res){
		Job.findOneAndUpdate({_id: req.params.id}, req.body, function(err,job){
			if(err) throw err
			Job.findById(req.params.id, function(err,updateJob){
				res.json(updateJob)
			})
		})
	})
	.delete(function(req,res){
		Job.findOneAndRemove({_id: req.params.id}, req.body, function(err,job){
			if(err) throw err
			res.json({message:"job deleted!"})
		})
	})


apiRouter.get('/destroy-all', function(req,res){
	Job.remove({}, function(err){
		if(err) throw err
		res.json({message: 'All jobs destroyed! Booooom!'})
	})
})

// -----------------------------------api routes for a user -------------------------------------------------------------------------
// route to generate sample user
apiRouter.post('/sample', function(req, res) {

	// look for the user named test
	User.findOne({ 'username': 'test' }, function(err, user) {

		// if there is no test user, create one
		if (!user) {
			var sampleUser = new User();

			sampleUser.name = 'test';
			sampleUser.username = 'test';
			sampleUser.password = 'test';

			sampleUser.save();
		} else {
			console.log(user);

			// if there is a test user, update the password
			user.password = 'test';
			user.save();
		}
		res.send('done')
	});

});

apiRouter.route('/users')

	// create a user (accessed at POST http://localhost:8080/users)
	.post(function(req, res) {

		var user = new User();		// create a new instance of the User model
		user.name = req.body.name;  // set the users name (comes from the request)
		user.username = req.body.username;  // set the users username (comes from the request)
		user.password = req.body.password;  // set the users password (comes from the request)

		user.save(function(err) {
			if (err) {
				// duplicate entry
				if (err.code == 11000)
					return res.json({ success: false, message: 'A user with that username already exists. '});
				else
					return res.send(err);
			}

			// return a message
			res.json({ message: 'User created!' });
		});

	})

	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });
	});


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRouter.post('/authenticate', function(req, res) {

	// find the user
	User.findOne({
		username: req.body.username
	}).select('name username password').exec(function(err, user) {

		if (err) throw err;

		// no user with that username was found
		if (!user) {
			res.json({
				success: false,
				message: 'Authentication failed. User not found.'
			});
		} else if (user) {

			// check if password matches
			var validPassword = user.comparePassword(req.body.password);
			if (!validPassword) {
				res.json({
					success: false,
					message: 'Authentication failed. Wrong password.'
				});
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign({
					name: user.name,
					username: user.username
				}, superSecret, {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}

		}

	});
});

// route middleware to verify a token
apiRouter.use(function(req, res, next) {
	// do logging
	console.log('Somebody just came to our app!');

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, superSecret, function(err, decoded) {

			if (err) {
				res.status(403).send({
					success: false,
					message: 'Failed to authenticate token.'
			});
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;

				next(); // make sure we go to the next routes and don't stop here
			}
		});

	} else {

		// if there is no token
		// return an HTTP response of 403 (access forbidden) and an error message
		res.status(403).send({
			success: false,
			message: 'No token provided.'
		});

	}
});

// test route to make sure everything is working
// accessed at GET http://localhost:8080/api

// on routes that end in /users
// ----------------------------------------------------
apiRouter.route('/users')

	// create a user (accessed at POST http://localhost:8080/users)
	.post(function(req, res) {

		var user = new User();		// create a new instance of the User model
		user.name = req.body.name;  // set the users name (comes from the request)
		user.username = req.body.username;  // set the users username (comes from the request)
		user.password = req.body.password;  // set the users password (comes from the request)

		user.save(function(err) {
			if (err) {
				// duplicate entry
				if (err.code == 11000)
					return res.json({ success: false, message: 'A user with that username already exists. '});
				else
					return res.send(err);
			}

			// return a message
			res.json({ message: 'User created!' });
		});

	})

	// get all the users (accessed at GET http://localhost:8080/api/users)
	.get(function(req, res) {

		User.find({}, function(err, users) {
			if (err) res.send(err);

			// return the users
			res.json(users);
		});
	});

// on routes that end in /users/:user_id
// ----------------------------------------------------
apiRouter.route('/users/:user_id')

	// get the user with that id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) res.send(err);

			// return that user
			res.json(user);
		});
	})

	// update the user with this id
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {

			if (err) res.send(err);

			// set the new user information if it exists in the request
			if (req.body.name) user.name = req.body.name;
			if (req.body.username) user.username = req.body.username;
			if (req.body.password) user.password = req.body.password;

			// save the user
			user.save(function(err) {
				if (err) res.send(err);

				// return a message
				res.json({ message: 'User updated!' });
			});

		});
	})

	// delete the user with this id
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err) res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});

module.exports = apiRouter
