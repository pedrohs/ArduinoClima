module.exports = function(app){
	var indexCtrl = app.controllers.index;

	app.get('/', indexCtrl.index);
	app.get('/temps', indexCtrl.temps);
}