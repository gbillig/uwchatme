var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

//Binding port number
//app.use(express.logger('dev'));
var port = process.env.PORT || 9999;
console.log("Port: " + port);
http.listen(port, function(){
  console.log('listening on *:' + port);
});

mongoose.connect("mongodb://localhost/uwchat");

app.use(function(request, response, next) {
  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Bitch, stop chatting and listen to class");
    // The middleware stops here.
  } else {
    next();
  }
});
