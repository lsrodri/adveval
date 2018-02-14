eventPlannerApp.controller('sidebarCtrl', function ($scope,$routeParams, firebaseService, alertService) {

	$scope.removeEvent = function(id){
		
		alertService.add("alert-success", "Removed from your list!", 4000);

		delete $scope.myRooms[id];
		$scope.myRooms.$save();
		
	}

	//Checking on authentication
	firebaseService.checkAuth(function(){
		//Assigning the firebase object to myRooms
		$scope.myRooms = firebaseService.getRooms();
	});

}); 