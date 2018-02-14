eventPlannerApp.factory('firebaseService', function($firebaseObject, $firebaseArray) {
    
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAQmXz8Ehr5THimTgt2RRh2DsA0a0olAto",
      authDomain: "Rooms-394dd.firebaseapp.com",
      databaseURL: "https://Rooms-394dd.firebaseio.com",
      storageBucket: "Rooms-394dd.appspot.com",
      messagingSenderId: "1034358825975",
      projectId: "Rooms-394dd"
    };

    firebase.initializeApp(config);

    return {
        getRef: function(){
            //Database name: Rooms
            //Getting only the Rooms created by the user using uid
            var ref = firebase.database()
                .ref("Rooms")
                .child(firebase.auth().currentUser.uid);
            return ref;
        },
        getRooms: function(orderBy){
            //Database name: Rooms
            var ref = firebase.database().ref("Rooms");
            var uid = firebase.auth().currentUser.uid;
            //Getting only the Rooms created by the user using uid
            return $firebaseObject(ref.child(uid));
        },
        checkAuth: function(callback){
            //Checking on authentication
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    //Getting user's list of Rooms
                    callback();
                }
            });
        },
        checkBeforeAdding: function(id) {
            //Database name: Rooms
            //Getting this uid already has an event with the same id
            var ref = firebase.database().ref("Rooms")
                        .child(firebase.auth().currentUser.uid)
                        .orderByChild("eventId")
                        .equalTo(id);
            return ref;
        },
        addEvent: function(id,name,datetime,image, callback){
            this.checkBeforeAdding(id).once('value').then(function(data){
                var unique = false;

                //will return true only if item with the same id was not found
                if(data.val() === null) {
                    unique = true;
                }

                callback(unique);
            });
        },
        fbLogin: function(){
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }
    }
});