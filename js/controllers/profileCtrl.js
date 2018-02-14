eventPlannerApp.controller('ProfileCtrl', function ($scope, $routeParams, firebaseService) {

	//Checking on authentication
	firebaseService.checkAuth(function(){
	    $scope.name = firebase.auth().currentUser.displayName;
		$scope.avatar = firebase.auth().currentUser.photoURL;
	});

}); 