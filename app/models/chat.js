var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
	text: String,
	author: mongoose.Schema.Types.Mixed,
	course: {type: String, default: "ECE240"},
	timestamp: {type: Date, default: Date.now}
});

module.export = chatModel = mongoose.model("Chat", ChatSchema);