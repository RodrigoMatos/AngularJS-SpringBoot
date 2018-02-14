/*var app = angular.module("myApp", []);

angular.module('myApp', [])
  .controller('home', function($scope, $http) {
  $http.get('/pessoa/resource/').then(function(data) {
    $scope.greeting = data.data;
  })
});*/


angular.module("myApp.controllers", []);
angular.module("myApp.services", []);
var app = angular.module("myApp", ["ngResource", "myApp.controllers", "myApp.services"]);
/*
(function(angular) {
  angular.module("myApp.controllers", []);
  angular.module("myApp.services", []);
  angular.module("myApp", ["ngResource", "myApp.controllers", "myApp.services"]);
}(angular));
*/