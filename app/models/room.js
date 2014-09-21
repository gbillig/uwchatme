var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
	name: String,
	question: {type: mongoose.Schema.Types.Mixed, default: []},
	history: {type: mongoose.Schema.Types.Mixed, default: []},
	shistory: {type: mongoose.Schema.Types.Mixed, default: []},
	time: {type: mongoose.Schema.Types.Mixed, default: []}
});

module.export = roomModel = mongoose.model("Room", RoomSchema);