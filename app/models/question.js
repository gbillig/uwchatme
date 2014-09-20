var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	text: String,
	author: mongoose.Schema.Types.Mixed,
	timestamp: {type: Date, default: Date.now},
	answer: mongoose.Schema.Types.Mixed
});

module.export = questionModel = mongoose.model('Question', QuestionSchema);