var mongoose = require('mongoose');

var AccountSchema = new mongoose.Scema({
	questID: String,
	name: String,
	password: {type: String, default: "password"}
});

mongoose.model("Account", AccountSchema);