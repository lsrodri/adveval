eventPlannerApp.factory('alertService', function($timeout) {
    
    var alerts = [];

    return {
        add: function(type, msg, timeout) {

            var alertService = this;

            alerts.push({
                type: type,
                msg: msg
            }); 

            if(timeout){
                $timeout(function(){
                    alertService.closeAlert(alerts.length -1)
                    }, timeout);
            }

            return alerts;
        },
        closeAlert: function(index) {
            return alerts.splice(index, 1);
        },
        clear: function(){
            alerts.splice(0, alerts.length);
        },
        get: function(){
            return alerts;
        }
    }

});