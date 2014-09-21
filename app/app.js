var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Binding port number
var port = process.env.PORT || 9999;
console.log("Port: " + port);
http.listen(port, function(){
  console.log('listening on: ' + port);
});

mongoose.connect("mongodb://localhost/uwchat");

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use('/pages', express.static(__dirname + '/pages')); // set the static files location /public/img will be /img for users
app.use('/thirdparty', express.static(__dirname + '/thirdparty')); // set the static files location /public/img will be /img for users
app.use('/socket.io', express.static(__dirname + '/socket.io'));
app.use('/', express.static(__dirname));

require('./routes')(app);
require('./models/chat');
require('./models/question');
require('./models/room');

io.on('connection', function(socket){

	console.log("Connection is made: " + socket.id);

	//socket user check
	socket.join("ECE240 LEC 1");

	socket.on('message', function(message){
		//chat comes in
		console.log(message.text);
		console.log(socket.rooms);
		//create chat history object
		var chat = {
			content: message.text,
			author: message.author.name,
			questId: message.author.questId
		};
		console.log(chat);
		//query room, get room.history
		roomModel.findOneAndUpdate({name: socket.rooms[1]}, {$push: { history : chat }}, {}, function(err, room){
			console.log("The room: " + room);
			io.emit('message', message);
		});

	});

	socket.on('smessage', function(message){
		//chat comes in
		console.log(message.text);
		console.log(socket.rooms);
		//create chat history object
		var chat = {
			content: message.text,
			author: message.author.name,
			questId: message.author.questId
		};
		console.log(chat);
		//query room, get room.history
		roomModel.findOneAndUpdate({name: socket.rooms[1]}, {$push: { shistory : chat }}, {upsert: true}, function(err, room){
			console.log("The room: " + room);
			io.emit('smessage', message)
		});

	});

	socket.on('question', function(question){
		console.log(question.text);

		roomModel.findOne({name: socket.rooms[1]}, 'question', function(err, result){

			var newquestion = {
			text: question.text,
			id: "question_" + result.question.length,
			author: question.author,
			answers: []
			};

			roomModel.findOneAndUpdate({name: socket.rooms[1]}, {$push: { question : newquestion }}, {}, function(err, room){
				io.emit('question', newquestion);
			});
		});
	});


	socket.on('answer', function(answer){
		console.log(answer);
		io.emit('answer', answer);
		
	});
});