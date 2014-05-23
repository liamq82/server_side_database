// server.js

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/server_side_database'); // connect to our database

var Item = require('./app/models/item');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
router.route('/item')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {
		
		var item = new Item(); 		// create a new instance of the Bear model
		item.type = req.body.type;  // set the bears name (comes from the request)

		// save the bear and check for errors
		item.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Item created!' });
		});
		
	}).get(function(req, res) {
		Item.find(function(err, items) {
			if (err)
				res.send(err);

			res.json(items);
		});
	});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
/*router.get('/', function(req, res) {
    res.json({
        inventory: 'This is our inventory'
    });
});
*/
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/inventory', router);
// simple logger
app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server.js started on port ' + port);
