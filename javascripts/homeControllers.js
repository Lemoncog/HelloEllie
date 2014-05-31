console.log("homeControllers.js start");

var graphApp = angular.module('homeControllers', []);

graphApp.controller('GreetingCtrl', function($scope) {
	$scope.greeting = "Hello Greetings";
});

graphApp.controller('HeaderCtrl', function($scope, $location, $http) {
	$http.get('data/graphs.json').success(function(data) {
		$scope.headers = data;	
	});
});

graphApp.controller('blobGraphCtrl', ['$scope', '$http',
	function($scope, $http) {
		$http.get('data/graphData.json').success(function(data) {
			var blobGraph = new BlobGraph();
    		blobGraph.generateGraph(d3, data);
		});
}]);

console.log("homeControllers.js end"); 