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


graphApp.controller('vertGraphCtrl', ['$scope', '$http',
	function($scope, $http) {
		$http.get('data/commitLog.json').success(function(data) {
			var learningGraphVert = new LearningGraphVert();
			console.log("learningGraphVert=" + learningGraphVert);
 
 			learningGraphVert.costomiseMappings('filesChanged', 'insertions');
    		learningGraphVert.generateGraph(d3, data);
			
			console.log('data=' + data);
			console.log('$scope=' + $scope);
		});
}]);

graphApp.controller('horGraphCtrl', ['$scope', '$http',
	function($scope, $http) {
		$http.get('data/commitLog.json').success(function(data) {
			var learningGraphHor = new LearningGraphHor();
			console.log("learningGraphHor=" + learningGraphHor);
 
 			learningGraphHor.costomiseMappings('filesChanged', 'insertions');
    		learningGraphHor.generateGraph(d3, data);
			
			console.log('data=' + data);
			console.log('$scope=' + $scope);
		});
}]);

console.log("homeControllers.js end"); 