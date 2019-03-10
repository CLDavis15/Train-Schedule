
$(document).ready(function () {


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





    $("#add-train-submit").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#trainName").val().trim();
        var trainLocation = $("#trainDestination").val().trim();
        var firstTime = moment($("#trainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var trainRate = $("#trainFrequency").val().trim();

        datebase.ref().push({
            name: trainName,
            location: trainLocation,
            time: firstTime,
            rate: trainRate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        });


        
        
    });
    
    database.ref().on("child_added", function (childSnapshot) {
        
        console.log(childSnapshot.val());
        
        var trainName = childSnapshot.val().name;
        var trainLocation = childSnapshot.val().location;
        var firstTime = childSnapshot.val().time;
        var trainRate = childSnapshot.val().rate;
        
        
        
        
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        
        var currentTime = moment();
        
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        
        var tRemainder = diffTime % trainRate;
        
        var tMinutesTillTrain = trainRate - tRemainder;
        
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        
        var catchTrain = moment(nextTrain).format("HH:mm");
        
        var newRow = $("<tr>").append(
            
            $("<td>").text(trainName),
            $("<td>").text(trainLocation),
            $("<td>").text(trainRate + "mins"),
            $("<td>").text(tRemainder),
            $("<td>").text(catchTrain)
            
            );
            
            $("#train-list > tbody").append(newRow);
            
            $("#trainName").val("");
            $("#trainDestination").val("");
            $("#trainTime").val("");
            $("#trainFrequency").val("");
        
            return false;

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            
        });
        
        
    });