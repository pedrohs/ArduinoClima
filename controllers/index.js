module.exports = function(app){
	var Temp = app.models.temperatura;
	
	var indexController = {
		index: function(req, res){
			res.render('index');
		},
		temps: function(req, res){
			Temp.find({}, function(erro, resultado){
				res.json(resultado);
			});
		}

	}
	return indexController;
}