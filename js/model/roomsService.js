eventPlannerApp.factory('roomsService',function ($resource) {

	/*
		Implementation of facebook-Rooms by location:
		https://www.npmjs.com/package/facebook-Rooms-by-location

		As Heroku decides on ports, changed index.js line 19:

		app.set("port", process.env.PORT0 || 3000);

		to 

		app.set("port", process.env.PORT || 3000);
	*/
	
	return $resource("/mockup-db/rooms.json");

});