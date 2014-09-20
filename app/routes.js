var mongoose = require("mongoose");
require('./models/account');

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.sendfile("index.html");
	});

	// route to handle all angular requests
	app.post('/api/createUser', function(req, res){
		//var parsedJson = JSON.parse(req);
		console.log(req.body);
		res.json({ message: 'User Created!!!!' });
		//Verify that account has not been already created
		var user = new accountModel(req.body);
		user.save(function(err){
			if(!err)
				console.log("user created");
			else
				console.log("error: " + err);
		});

	});

	//login API
	//QnA API for searching archive only

};