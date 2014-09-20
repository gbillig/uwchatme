var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
	content: String,
	author: String,
	questId: String,
	course: {type: String, default: "ECE240"},
	timestamp: {type: Date, default: Date.now}
});

module.export = chatContent = mongoose.model("Chat", ChatSchema);