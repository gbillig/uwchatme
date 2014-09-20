var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
<<<<<<< HEAD
	text: String,
	author: mongoose.Schema.Types.Mixed,
=======
	content: String,
	author: String,
	questId: String,
>>>>>>> 0818d977891bbfc25ec577c1bb4f77f2ac695030
	course: {type: String, default: "ECE240"},
	timestamp: {type: Date, default: Date.now}
});

module.export = chatModel = mongoose.model("Chat", ChatSchema);
