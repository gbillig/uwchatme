var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
	questID: String,
	name: String,
	password: {type: String, default: "password"}
});

module.export = accountModel = mongoose.model("Account", AccountSchema);