eventPlannerApp.factory('trialService',function ($http, $q) {
	
	var csvUrl = "/experiment.csv";
    var result = false;

    var getData = function(participant, block, trial) {

    	/*
    	$http.get(csvUrl)
    	.then(function(response){
    		var dataObject = jQuery.csv.toObjects(response);
            console.log("a");
            return dataObject;
    	});
		*/
		var deferred = $q.defer();

    	$.ajax({url: "/experiment.csv", success: function(result){
	        var dataObject = $.csv.toObjects(result);
	        for (var i = 0; i < dataObject.length; i++) {
	        	if (dataObject[i].Participant == participant &&
	        		dataObject[i].Block == block &&
	        		dataObject[i].Trial == trial) {
	        		
	        		resultObject = {
	        			"ObjectCount": dataObject[i].ObjectCount,
	        			"VVChange": dataObject[i].VVChange
	        		};
					
	        		deferred.resolve(resultObject);
	        		return false;
	        	}
	        };
	       
	    }});

	    return deferred.promise;

    };

    return {

        getData: getData,
        parseData: function(retrievedData) {
        	console.log(retrievedData);
            var data = jQuery.csv.toObjects(retrievedData);
            console.log(data);
            return {
                'header': data[0], 
                'rows': data.slice(1, data.length)
            };
        }

    };

});