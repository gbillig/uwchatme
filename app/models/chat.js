var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
	content: String,
	author: String,
	course: Number, //Shoud think about this
	timestamp: {type: Date, default: Date.now}
});

module.export = chatContent = mongoose.model("Chat", ChatSchema);