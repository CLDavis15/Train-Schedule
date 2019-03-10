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


$("#submit-bid").on("click", function (event) {
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

    $("#train-list").append("<div class='well'><span class='train-name'> " +
        childSnapshot.val().trainName +
        " </span><span class='train-destination'> " + childSnapshot.val().destination +
        " </span><span class='train-time'> " + childSnapshot.val().firstTime +
        " </span><span class='train-rate'> " + childSnapshot.val().frequency +
        " </span></div>");



}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);

});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

    $("#train-name").text(snapshot.val().trainName);
    $("#destination-input").text(snapshot.val().destination);
    $("#time-input").text(snapshot.val().firstTime);
    $("#frequency-input").text(snapshot.val().frequency);
});