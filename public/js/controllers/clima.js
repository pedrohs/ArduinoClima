app.controller('climaCtrl', function($scope, socket, $http){	

	socket.on('dadosClima', function(data){
		var dados = JSON.parse(data);
		$scope.temperatura = dados.temperatura;
		$scope.umidade = dados.umidade;
	});

	$http.get('/temps').success(function(data){
		$scope.dados = data;
	});
});