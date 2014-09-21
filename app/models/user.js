var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	questId: String,
	name: String,
	password: {type: String, default: "password"},
	courses: {type : mongoose.Schema.Types.Mixed, default: []}
});

module.export = userModel = mongoose.model("users", userSchema);