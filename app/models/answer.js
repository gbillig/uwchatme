var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
	text: String,
	author: mongoose.Schema.Types.Mixed,
	questionId: mongoose.Schema.Types.ObjectId,
	timestamp: {type: Date, default: Date.now}
});

module.export = answerModel = mongoose.model("Answer", AnswerSchema);