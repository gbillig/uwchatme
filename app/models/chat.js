var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
	content: String,
	course: Number, //Shoud think about this
	timestamp: {type: Date, default: Date.now}
});

mongoose.model("Chat", ChatSchema);