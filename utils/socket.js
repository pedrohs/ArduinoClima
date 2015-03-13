module.exports = function(app){
	var io = app.io;

	io.on("connection", function(socket){
		socket.emit("dadosClima", app.dados);
		setInterval(function(){
			socket.emit("dadosClima", app.dados);
		}, 1000);	
	});
}