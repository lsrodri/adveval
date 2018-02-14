eventPlannerApp.controller('showEventCtrl', function ($scope,$routeParams,facebookService,firebaseService,alertService) {

	facebookService.getToken().then(function(token){
		facebookService.getEvent(token, $routeParams.eventId).then(function(event){
			$scope.event = event;
		}, function(error){
			//Error getting event
			alertService.add("alert-warning", "Unable to fetch event.");
		});
	}, function(error){
		//Error getting token
		console.log(error);
		alertService.add("alert-warning", "Unable to fetch event.");
	});

	$scope.doTheBack = function() {
  		window.history.back();
	};

	//Checking on authentication
	firebaseService.checkAuth(function(){
		//Getting user's list of Rooms
		$scope.myRooms = firebaseService.getRef();
	});

	$scope.addEvent = function(id,name,datetime,image){
		
		firebaseService.addEvent(id,name,datetime,image, function(unique) {
		  
		  //if event is not already in the user's list, allow adding to continue
		  if(unique === true) {
		  	/*
		  	Firebase allows a 3-way data binding,
		  	so it is not necessary to call a service as updating the
		  	appropriate variable in the scope updates the service
		  	*/
		  	$scope.myRooms.push({
				"eventDate" : datetime,
				"eventId" : id,
				"eventImage" : image,
				"eventName" : name
		    });

		    $scope.$apply(function () {
		  		alertService.add("alert-success", "Added to your list!", 4000);
		  	});

		  //otherwise let user know the new event is already saved
		  } else {
		  	//Telling users that the event is already in their list of Rooms
		  	$scope.$apply(function () {
		  		alertService.add("alert-warning", "This event already exists in your list.", 4000);
		  	});

		  }

		});

	}

}); 