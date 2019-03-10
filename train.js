var config = {
    apiKey: "AIzaSyCouVSJHZiV-D3hr4YdXDlMxbngS2-dhd8",
    authDomain: "train-project-7c3fd.firebaseapp.com",
    databaseURL: "https://train-project-7c3fd.firebaseio.com",
    projectId: "train-project-7c3fd",
    storageBucket: "train-project-7c3fd.appspot.com",
    messagingSenderId: "343762643008"
};
firebase.initializeApp(config);




var database = firebase.database();


var trainName = "";
var location = "";
var time = "";
var rate = "";








$("#add-train-submit").on("click", function (event) {
    event.preventDefault();
    
    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    
    datebase.ref().push({
        name: trainName,
        location: destination,
        time: firstTime,
        rate: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        
    });
    
    
});

database.ref().on("child_added", function (childSnapshot) {
    
    console.log(childSnapshot.val());
    
    var trainName = childSnapshot.val().name;
    var trainLocation = childSnapshot.val().location;
    var trainTime = childSnapshot.val().time;
    var trainRate = childSnapshot.val().rate;
    
    
    console.log(trainName);
    console.log(trainLocation);
    console.log(trainTime);
    console.log(trainRate);
    
    var tFrequency = "";
    
    
    var firstTime = "";
    
    
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    
    
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    
    
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
    
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    var newRow = $("<tr>").append(

        $("<td>").text(trainName),
        $("<td>").text(trainLocation),
        $("<td>").text(trainRate),
        $("<td>").text(tRemainder),
        $("<td>").text(nextTrain)
        
    );

        $("#train-list > tbody").append(newRow);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);

});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

    $("#train-name").text(snapshot.val().trainName);
    $("#destination-input").text(snapshot.val().destination);
    $("#time-input").text(snapshot.val().firstTime);
    $("#frequency-input").text(snapshot.val().frequency);
});