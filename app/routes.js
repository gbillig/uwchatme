var mongoose = require("mongoose");

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.sendfile("index.html");
	});

	// route to handle all angular requests
	app.post('/api/createUser', function(req, res){
		//var parsedJson = JSON.parse(req);
		console.log(req.body);	
		res.json({ message: 'User Created!!!!' });
	});

};