var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	question: String,
	timestamp: {type: Date, default: Date.now},
	subject: Number
});

mongoose.model('Question', QuestionSchema);