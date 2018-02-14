var eventPlannerApp = angular.module('eventPlanner', ['ngRoute','ngResource'] );

eventPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Home', {
        templateUrl: 'view/home.html',
        controller: 'homeCtrl'
      }).
      when('/Trial/:participant/:block/:trial',{
         templateUrl: 'view/trial.html',
         controller: 'trialCtrl'
      }).
      when('/Finished',{
         templateUrl: 'view/finished.html'
      }).
      otherwise({
        redirectTo: '/Home'
      });
}]); 

eventPlannerApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);