var app = angular.module('app', ["ngRoute", "socket-io"]);

app.controller('Ctrl', function($scope){

});

app.config(['$routeProvider', 
	function($routeProvider){
		$routeProvider.when('/home', {
			templateUrl: 'js/templates/home.html'
		}).
		when('/clima', {
			templateUrl: 'js/templates/climatizacao.html',
			controller: "climaCtrl"
		}).
		otherwise({
			redirectTo: '/clima'
		});
}]);