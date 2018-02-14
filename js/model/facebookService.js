eventPlannerApp.factory('facebookService', function($window, $q) {
    //$window.fbAsyncInit = function() {
        FB.init({ 
          appId: '270496210056786',
          status: true, 
          cookie: true, 
          xfbml: true,
          version: 'v2.4'
        });
    //};
    return {
        getToken: function(){ 
            var deferred = $q.defer();
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    deferred.resolve(response.authResponse.accessToken);
                } else {
                    deferred.reject('Error occured');
                }
            });
            return deferred.promise;
        },
        getEvent: function(token, id) {
          var deferred = $q.defer();
          FB.api(
            '/' + id,
            'GET',
            {
              "accessToken":token,
              "fields":"attending_count,cover,description,start_time,end_time,name,place"
            },
            function(response) {
                deferred.resolve(response);
            }
          );
          return deferred.promise;
        }
    }
});