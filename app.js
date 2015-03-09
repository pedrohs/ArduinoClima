var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var moment = require("moment");
var ejs = require("ejs");
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var mongoose = require("mongoose");

var dados;
var Temp;
//Express
app.set('view engine', 'ejs');  
app.use(express.static(__dirname + '/public'));

//MongoDB
var db = mongoose.connection;

db.on("open", function(){
	console.log("Banco de Dados Conectado");

	var tempSchema = new mongoose.Schema({
		temperatura: Number,
		umidade: Number
	});

	Temp = mongoose.model('Temp', tempSchema);
});
mongoose.connect('mongodb://localhost/arduinoClima');

//Serial
var serial = new SerialPort("/dev/ttyACM0", {
	parser: serialport.parsers.readline("\n"),
	baudrate: 9600
});

serial.on("open", function(){
	console.log("Porta Serial Aberta");

	var timer = setInterval(function(){
		var data = JSON.parse(dados);
		var tempDados = new Temp(data);
		tempDados.save(function(erro){
			if(erro) console.log(erro);
		});
	},60000);

	serial.on("data", function(data){
		dados = data;
	});
});

