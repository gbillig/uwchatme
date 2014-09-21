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
		// require('./ical2course')(req.body.iCal, Date.now());

		//Verify that account has not been already created
		userModel.findOne({ questId: req.body.questId}, 'questId', function(err, result){
			console.log("result: " + result);
			if(!err){
				if (!result){
					req.body.courses = [];
					var user = new userModel(req.body);
					user.save(function(err){
						if(!err){
							console.log("user created");
							var publicInfo = req.body;
							delete publicInfo.password;
							res.json(publicInfo);
						} else {
							console.log("error: " + err);
						}
					});
				} else {
					console.log("Bitch you already registered.");
					res.json({ message: 'Bitch you already registered.' });
					res.writeHead(400, {"Content-Type": "text/plain"});

				}
			} else {
				console.log(err);
			}
	
		});
			

	});

	//login API
	app.post('api/login', function(req, res){
		userModel.findOne({ questId: req.body.questId}, function(err, result){
			if(!err){
				if (!result){
					if (req.body.questId == result.questId && req.body.password == result.password){
						//Check if one has class
						//Wait for Gleb
						var publicInfo = req.body;
						delete publicInfo.password;
						res.writeHead(200, {"Content-Type": "text/plain"});
						res.json(publicInfo);
					} else {
						res.write(401, {"Content-Type": "text/plain"});
						res.json( { message: "login failed"});
					}				
				}
			} else {
				console.log(err);
			}

		});
	});

	//QnA API for searching archive only

};