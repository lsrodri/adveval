eventPlannerApp.controller('trialCtrl', function ($scope,$routeParams,$location,trialService) {

	var oddItemPosition = -1;
	var objectCount = -1;
	var vvChange = "";
	var start = 0;
	var elapsed = 0;
	var trialId = "";
	var previousErrors = 0;
	var nextTrial = "";

	$scope.imageGrid = [];
	$scope.loading = false;
	$scope.participant = $routeParams.participant;
	$scope.block = $routeParams.block;
	$scope.trial = $routeParams.trial;
	$scope.imageGridClass = "";
	$scope.checkPhase = false;


	$scope.findNext = function(){
		var participantInt = parseInt($scope.participant);
		var blockInt = parseInt($scope.block);
		var trialInt = parseInt($scope.trial);
		if(trialInt < 14){
			nextTrial = "/Trial/" + participantInt + "/" + blockInt + "/" + ++trialInt;
		} else if (blockInt < 3) {
			nextTrial = "/Trial/" + participantInt + "/" + ++blockInt + "/0";
		} else {
			nextTrial = "/Finished"
		}
	}

	$scope.checkOdd = function(selectedItem){
		if($scope.checkPhase){
			// Concatenating the id for checking existing record
			trialId = $scope.participant + "-" + $scope.block + "-" + $scope.trial;
			// Checking if an item exists
			if(localStorage.getItem(trialId)){
				previousErrors = parseInt(localStorage.getItem(trialId).split(",")[1]);
			}
			// find the next trial
			$scope.findNext();
			// If the user gets it correctly
			if(selectedItem === oddItemPosition){
				// Write a record with elapsed time and number of errors
				localStorage.setItem(trialId,elapsed+","+previousErrors);
				// move on to the next one
				$location.path(nextTrial);
			} else {
				// Write a record with elapsed time and number of errors
				localStorage.setItem(trialId,0 + "," + ++previousErrors);
				// reload the view so the user can try it again
				location.reload();
			}
		}
	}

	var getRandom = function(max)
	{
	    return Math.floor(Math.random() * max);
	}
    
    trialService.getData($scope.participant, $scope.block, $scope.trial)
    	.then(function(result){

    		vvChange = result.VVChange;
    		objectCount = parseInt(result.ObjectCount);
    		
    		for (var i = 0; i < objectCount; i++) {
    			$scope.imageGrid[i] = "img/item.png";
    		};

    		oddItemPosition = getRandom(objectCount);
    		$scope.imageGrid[oddItemPosition] = "img/item-" + vvChange + ".png";

    		$scope.imageGridClass = "trial-item-" + objectCount;

    		start = new Date().getTime();

    	});

    // Handling the chronometer stop and screen confirmation
    $(window).keydown(function (event) {
	    if (event.which === 32) {
	    	elapsed = new Date().getTime() - start;
	    	$("." + $scope.imageGridClass + " img").attr("src","img/gray-cross.png").addClass("clickable");
	    	$scope.checkPhase = true;
	    }
	});

});