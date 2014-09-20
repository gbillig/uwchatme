var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');

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
app.use('/', express.static(__dirname));

require('./routes')(app);
