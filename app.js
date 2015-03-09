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
		umidade: Number,
		hora: String,
		data: String,
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
		io.emit('dadosClima', dados);
	});
});

app.get('/temps', function(req, res){
	Temp.find({}, function(erro, resultado){
		res.json(resultado);
	});
});

app.get('/', function(req, res){
	res.render('index2');
});

http.listen(4000, function(){
	console.log("HTTP iniciado na porta 4000");
})