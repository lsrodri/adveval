eventPlannerApp.controller('loginCtrl', function ($scope,$routeParams, $window, facebookService, firebaseService) {

	facebookService.getToken().then(function(token){
		if(token) {
			$window.location = "#!/Home"
		}
	}, function(error){
		
	});

	$scope.fbLogin = function(){
		firebaseService.fbLogin();
	}

}); 