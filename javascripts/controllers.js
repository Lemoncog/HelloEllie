console.log("controllers.js start");

var homeModule = angular.module('homeControllers', []);

homeModule.controller('GreetingCtrl', function($scope) {
	$scope.greeting = "Hello Greetings";
});

homeModule.controller('HeaderCtrl', function($scope, $location) {
	$scope.headers = [ { 'title' : 'GraphA', 'link' : "graphVert" }, { 'title' : 'GraphB', 'link' : "graphHor" } ];
});

console.log("controllers.js end"); 