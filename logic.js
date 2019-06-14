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
    
    var currentTime = moment();
    console.log(currentTime);

    $("#submit").on("click", function(event) {
        event.preventDefault();
        trainName = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        trainTime = $("#train-time").val().trim();
        frequency = $("#frequency").val().trim();
        
        console.log(trainName);
        console.log(destination);
        console.log(trainTime);
        console.log(frequency);
        
        database.ref().push ({
            name: trainName,
            dest: destination,
            time: trainTime,
            freq: frequency,
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
    //console.log(snapshot.val().min);

    // Assumptions
    //var tFrequency = 3;

    // Time is 3:30 AM
    //var firstTime = "03:30";

    //First Time (pushed back 1 year to make sure it comes before current time)
    var trainTimeConverted = moment(snapshot.val().time, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log(currentTime);
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var remainder = diffTime % snapshot.val().freq;
    console.log(remainder);

    // Minute Until Train
    var minAway = snapshot.val().freq - remainder;
    console.log("MINUTES TILL TRAIN: " + minAway);

    // Next Train
    var next = moment().add(minAway, "minutes");
    var nextTrain = moment(next).format("hh:mm A")
    console.log("ARRIVAL TIME: " + moment(next).format("hh:mm"));

    $("tbody").append(
        $("<tr>").append(
            $("<td>").text(snapshot.val().name),
            $("<td>").text(snapshot.val().dest),
            $("<td>").text(snapshot.val().freq),
            $("<td>").text(nextTrain),
            $("<td>").text(minAway),
        )
    )
    
    
    
    // Handlee errors
    }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code); 
});








 


