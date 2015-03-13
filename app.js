var express = require("express");
var app = express();
var http = require("http").Server(app);
var load = require('express-load');
var ejs = require("ejs");
var io = require("socket.io")(http);

//Express
app.set('view engine', 'ejs');  
app.use(express.static(__dirname + '/public'));
app.io = io;

//MongoDB
var db = require("./config/db");

load('models').then('controllers').then('routes').then('utils').into(app);

http.listen(4000, function(){
	console.log("HTTP iniciado na porta 4000");
});

module.exports = app;