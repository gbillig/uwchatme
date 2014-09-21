var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	text: String,
	author: mongoose.Schema.Types.Mixed,
	timestamp: {type: Date, default: Date.now},
	answers: {type: Array, default: []}
});

module.export = questionModel = mongoose.model('Question', QuestionSchema);