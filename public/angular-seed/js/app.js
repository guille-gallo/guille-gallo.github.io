var pincheGomaApp = angular.module('pincheGomaApp', [
  'ngRoute',
  'pincheGomaAppControllers',
  'ngAnimate'
]);

pincheGomaApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);