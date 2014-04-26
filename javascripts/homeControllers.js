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
		$http.get('data/testData.json').success(function(data) {
			var blobGraph = new BlobGraph();
 
 			blobGraph.costomiseMappings('title', 'testVal');
    		blobGraph.generateGraph(d3, data);
		});
}]);



graphApp.controller('vertGraphCtrl', ['$scope', '$http',
	function($scope, $http) {
		$http.get('data/commitLog.json').success(function(data) {
			var learningGraphVert = new LearningGraphVert();
 
 			learningGraphVert.costomiseMappings('filesChanged', 'insertions');
    		learningGraphVert.generateGraph(d3, data);
		});
}]);

graphApp.controller('horGraphCtrl', ['$scope', '$http',
	function($scope, $http) {
		$http.get('data/testData.json').success(function(data) {
			var learningGraphHor = new LearningGraphHor();
 
 			learningGraphHor.costomiseMappings('title', 'testVal');
    		learningGraphHor.generateGraph(d3, data);
		});
}]);

console.log("homeControllers.js end"); 