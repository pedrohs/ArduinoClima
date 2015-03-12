module.exports = function(app){
	var moment = require("moment");
	var serialport = require("serialport");
	var SerialPort = serialport.SerialPort;
	var Temp = app.models.temperatura;

	var dados;

	var serial = new SerialPort("/dev/ttyACM0", {
		parser: serialport.parsers.readline("\n"),
		baudrate: 9600
	});

	serial.on("open", function(){
		console.log("Porta Serial Aberta");

		var timer = setInterval(function(){
			var data = JSON.parse(dados);
			var tempDados = new Temp({
				hora: moment().format("HH:mm"),
				data: moment().format("DD/MM/YYYY"),
				temperatura: data.temperatura,
				umidade: data.umidade			
			});
			tempDados.save(function(erro){
				if(erro) console.log(erro);
			});
		},600000);

		serial.on("data", function(data){
			dados = data;
			app.dados = data;
		});
	});
}