var menuDirectiva = function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'js/templates/menu.html'
	}
}

app.directive('menu', menuDirectiva);