console.log('This would be the main JS file.');

var graphApp = angular.module('GraphApp', [
	'ngRoute',
	'homeControllers'	
]);

graphApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/graphVert', {
        templateUrl: 'partials/graphs.html',
        controller: 'vertGraphCtrl'
      }).
      when('/graphHor', {
        templateUrl: 'partials/graphs.html',
        controller: 'horGraphCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

console.log("graphApp=" + graphApp);