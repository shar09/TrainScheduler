var firebaseConfig = {
    apiKey: "AIzaSyA8pmak8qCLNE1R4_5yKfQKD2DqrogA_Yc",
    authDomain: "trainscheduler-f324d.firebaseapp.com",
    databaseURL: "https://trainscheduler-f324d.firebaseio.com",
    projectId: "trainscheduler-f324d",
    storageBucket: "trainscheduler-f324d.appspot.com",
    messagingSenderId: "559899416641",
    appId: "1:559899416641:web:2f11952ccb325552"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

var database = firebase.database();

$(document).ready(function() { 
    var trainName;
    var destination;
    var trainTime;
    var frequency;
    var minAway;
    var tRow = $("<tr>");

    $("#submit").on("click", function(event) {
        event.preventDefault();
        trainName = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        trainTime = $("#train-time").val().trim();
        frequency = $("#frequency").val().trim();
        minAway = "dont know";
        
        console.log(trainName);
        console.log(destination);
        console.log(trainTime);
        console.log(frequency);

       /* var tName = $("<td>").text(trainName);
        var tDest = $("<td>").text(destination);
        var tTime = $("<td>").text(trainTime);
        var tFreq = $("<td>").text(frequency);
        var tMin = $("<td>").text(minAway);
       
        tRow.append(tName, tDest, tTime, tFreq, tMin);
        $("tbody").append(tRow);*/ 

        database.ref().push ({
            name: trainName,
            dest: destination,
            time: trainTime,
            freq: frequency,
            min: minAway
        });
    });
});

database.ref().on("child_added", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().time);
    console.log(snapshot.val().freq);
    console.log(snapshot.val().minAway);

    
    trainName = $("<td>").text(snapshot.val().name);
    destination = $("<td>").text(snapshot.val().dest);
    trainTime = $("<td>").text(snapshot.val().time);
    frequency = $("<td>").text(snapshot.val().freq);
    minAway = $("<td>").text(snapshot.val().min);
    tRow.append(trainName, destination, trainTime, frequency, minAway);
    $("tbody").append(tRow); 
    // Handlee errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code); 
});








 


