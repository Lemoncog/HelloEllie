console.log("homeControllers.js start");

var graphApp = angular.module('homeControllers', []);

//Set up our graphing dependencies
graphApp.factory('learningGraphVert', function() {
	console.log("Providing new graphVert()");
	return new LearningGraphVert();
});

graphApp.controller('GreetingCtrl', function($scope) {
	$scope.greeting = "Hello Greetings";
});

graphApp.controller('HeaderCtrl', function($scope, $location) {
	$scope.headers = [ { 'title' : 'GraphA', 'link' : "graphVert" }, { 'title' : 'GraphB', 'link' : "graphHor" } ];
});


graphApp.controller('vertGraphCtrl', ['$scope', '$http', 'learningGraphVert',
	function($scope, $http, learningGraphVert) {
		$http.get('data/commitLog.json').success(function(data) {
			$scope.graphData = data;

			console.log("learningGraphVert=" + learningGraphVert);
 
 			learningGraphVert.costomiseMappings('filesChanged', 'insertions');
    		learningGraphVert.generateGraph(d3, data);
			
			console.log('$scope.graphData=' + $scope.graphData);
			console.log('$scope=' + $scope);
		});
}]);

graphApp.controller('horGraphCtrl', ['$scope', '$http', 'learningGraphVert',
	function($scope, $http, learningGraphHor) {
		$http.get('data/commitLog.json').success(function(data) {
			$scope.graphData = data;

			console.log("learningGraphVert=" + learningGraphVert);
 
 			learningGraphHor.costomiseMappings('filesChanged', 'insertions');
    		learningGraphHor.generateGraph(d3, data);
			
			console.log('$scope.graphData=' + $scope.graphData);
			console.log('$scope=' + $scope);
		});
}]);

console.log("homeControllers.js end"); 