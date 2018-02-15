(function () {
	'use strict';

	var app = angular.module('app', ['ngResource', 'ui.router']);

	app.config(['$locationProvider', '$urlRouterProvider', '$stateProvider', function ($locationProvider, $urlRouterProvider, $stateProvider) {
	    //$locationProvider.html5Mode(true).hashPrefix('!')

	   $urlRouterProvider.otherwise('/crud');	

	    $stateProvider.state({
	        name: 'index',
	        templateUrl: 'index.html'
	    });

	    $stateProvider.state({
	        title: 'crud',
	        name: 'index.crud',
	        url: '/crud',
	        templateUrl: 'crud.html',
	    });

	}]);

	app.run(['$rootScope', '$location', '$transitions', '$state', function ($rootScope, $location, $transitions, $state) {
	    $transitions.onStart({}, () => {
	       console.log('new route');
	    });
	}]);

})();