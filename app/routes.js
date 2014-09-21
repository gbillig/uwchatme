var mongoose = require("mongoose");
require('./models/user');

module.exports = function(app) {

	//route to frontpage and let angular take it from there
	app.get('/', function(req, res) {
		res.sendfile("index.html");
	});

	//create new user
	app.post('/api/createUser', function(req, res){
		console.log(req.body.questId);
		
		//Verify that account has not been already created
		userModel.findOne({ questId: req.body.questId}, 'questId', function(err, result){
			console.log("result: " + result);
			if(!err){
				if (!result || result.questId != req.body.questId){
					var user = new userModel(req.body);
					user.save(function(err){
						if(!err){
							console.log("user created");
							res.json({ message: 'User Created' });
						} else {
							console.log("error: " + err);
						}
					});
				} else {
					console.log("Bitch you already registered.");
					res.writeHead(400, {"Content-Type": "text/plain"});
					res.end("Bitch you already registered.");
				}
			} else {
				console.log(err);
			}
	
		});
			

	});

	//login API

	//QnA API for searching archive only

};