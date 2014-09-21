var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	questId: String,
	name: String,
	password: {type: String, default: "password"},
	courses: mongoose.Schema.Types.Mixed
});

module.export = userModel = mongoose.model("users", userSchema);