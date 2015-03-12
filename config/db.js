var mongoose = require("mongoose");

var config = {
	"db": "arduinoClima",
	"host": "localhost",
	"port": 27017
};

var mongoUri = "mongodb://" + config.host + ":" + config.port + '/' + config.db;

mongoose.connect(mongoUri, function(erro, res){
	if(erro){
		console.log("Erro ao conetar a: " + mongoUri + ' - ' + erro);
	}else{
		console.log("Conectado com sucesso a " + mongoUri);
	}
});

exports.mongoose = mongoose;