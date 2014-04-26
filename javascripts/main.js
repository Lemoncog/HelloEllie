console.log('This would be the main JS file.');

var graphApp = angular.module('GraphApp', [
	'ngRoute',
	'homeControllers'	
]);

graphApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    	when('/blobGraph', {
        templateUrl: 'partials/graphs.html',
        controller: 'blobGraphCtrl'
      }).
      when('/graphVert', {
        templateUrl: 'partials/graphs.html',
        controller: 'vertGraphCtrl'
      }).
      when('/graphHor', {
        templateUrl: 'partials/graphs.html',
        controller: 'horGraphCtrl'
      }).
      otherwise({
        redirectTo: '/blobGraph'
      });
  }]);

console.log("graphApp=" + graphApp);