// app/routes.js

//var sensor = require('node-dht-sensor');

module.exports = function(app, passport) {



	//API FOR HUMIDITY SENSOR
	/*
	
		app.get('/temperature', isLoggedIn, function(req, res) {

			var sensorResult = null;

			sensor.read(11, 4, function(err, temperature, humidity) {
					    if (!err) {

					    	sensorResult = {'TemperatureC':temperature.toFixed(1),
					    					'HumidityPercent':humidity.toFixed(1)};
					    					
								res.send(sensorResult);
								
					        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
					            'humidity: ' + humidity.toFixed(1) + '%'
					        );
					    }
					});


			

		});
*/

	//Login and signup root::
			app.get('/details', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup_login.ejs');
				});
	
	//creating main landing page not logged in
			app.get('/welcome', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('index_landing_page.ejs');
				});
	
	

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	
		app.get('/', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
		});

	//app.get('/', function(req, res) {

	//	res.render('index.ejs'); // load the index.ejs file
	//});



	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

		app.get('/index', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('index.ejs');
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/index');
}
