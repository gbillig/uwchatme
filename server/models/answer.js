var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
	answer: String,
	id: mongoose.Schema.Types.ObjectID,
	timestamp: {type: Date, default: Date.now}
});

mongoose.model("Answer", AnswerSchema);