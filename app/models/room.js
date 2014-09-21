var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
	question: mongoose.Schema.Types.Mixed,
	history: mongoose.Schema.Types.Mixed,
	time: mongoose.Schema.Types.Mixed
});

module.export = roomModel = mongoose.model("Room", RoomSchema);