module.exports = function(){
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var tempSchema = Schema({
		temperatura: Number,
		umidade: Number,
		hora: String,
		data: String
	});

	return mongoose.model("Temp", tempSchema);
}