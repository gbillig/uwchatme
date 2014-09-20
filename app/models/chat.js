var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
	content: String,
	author: 
	course: Number, //Shoud think about this
	timestamp: {type: Date, default: Date.now}
});

export.module = chatContent = mongoose.model("Chat", ChatSchema);