eventPlannerApp.controller('practiceCtrl', function ($scope,$routeParams,$location,trialService,$timeout) {

	var oddItemPosition = -1;
	var objectCount = -1;
	var vvChange = "";
	var start = 0;
	var elapsed = 0;
	var trialId = "";
	var previousErrors = 0;
	var nextTrial = "";
	var vvChangeArray = [];

	$scope.imageGrid = [];
	$scope.loading = false;
	$scope.participant = $routeParams.participant;
	$scope.block = $routeParams.block;
	$scope.trial = $routeParams.trial;
	$scope.imageGridClass = "";
	$scope.checkPhase = false;
	$scope.nextAction = "";

	$scope.findNext = function(){
		var participantInt = parseInt($scope.participant);
		var blockInt = parseInt($scope.block);
		var trialInt = parseInt($scope.trial);
		if(trialInt < 2){
			nextTrial = "/Practice/" + participantInt + "/" + blockInt + "/" + ++trialInt;
		} else {
			nextTrial = "/Finished"
		}
	}

	$scope.doNextAction = function(){
		if($scope.nextAction == "Next") {
			$timeout( function(){
            	// move on to the next one
				$location.path(nextTrial);
        	}, 2000);
			$("#mainTrial, .status-message").hide();
			$("#Trial").html('<img src="img/kitten.jpg"/>');
		} else {
			// reload the view so the user can try it again
			location.reload();
		}
	}

	$scope.checkOdd = function(selectedItem){
		if($scope.checkPhase){
			// Concatenating the id for checking existing record
			trialId = $scope.participant + "," + $scope.block + "," + $scope.trial;
			// Checking if an item exists
			if(localStorage.getItem(trialId)){
				previousErrors = parseInt(localStorage.getItem(trialId).split(",")[1]);
			}
			// find the next trial
			$scope.findNext();
			// If the user gets it correctly
			if(selectedItem === oddItemPosition){
				$scope.nextAction = "Next";
				$(".status-message").html("Click on the <strong>Next</strong> button below to move on to the following trial");
			} else {
				$scope.nextAction = "Retry";
				$(".status-message").html("Click on <strong>Retry</strong> to try it again.");
			}
		}
	}

	var getRandom = function(max) {
	    return Math.floor(Math.random() * max);
	}
    
	var isInArray = function(value, array) {
	  return array.indexOf(value) > -1;
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

			if (vvChange == "VV1VV2") {
				
				var vv1Count = 0;
				var vv2Count = 0;
				var oddCount = Math.sqrt(objectCount);

				
				while (vv1Count < Math.sqrt(objectCount) + 1) {
				  attemptedNumber = getRandom(objectCount);
				  if ($scope.imageGrid[attemptedNumber] == "img/item.png") {
				  	$scope.imageGrid[attemptedNumber] = "img/item-VV1.png";
				  	vv1Count++;
				  }
				}

				while (vv2Count < Math.sqrt(objectCount) + 1) {
				  attemptedNumber = getRandom(objectCount);
				  if ($scope.imageGrid[attemptedNumber] == "img/item.png") {
				  	$scope.imageGrid[attemptedNumber] = "img/item-VV2.png";
				  	vv2Count++;
				  }
				}
			}

    		$scope.imageGridClass = "trial-item-" + objectCount;

    		start = new Date().getTime();

    	});

    // Handling the chronometer stop and screen confirmation
    $(window).keydown(function (event) {
	    if (event.which === 32 && elapsed == 0) {
	    	elapsed = new Date().getTime() - start;
	    	$("." + $scope.imageGridClass + " img").attr("src","img/gray-cross.png").addClass("clickable");
	    	$scope.checkPhase = true;
	    	$(".status-message").html("Click on the location where you saw an object that looked different from the rest.");
	    }
	});

});