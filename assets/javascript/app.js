// Initialize Firebase
var config = {
    apiKey: "AIzaSyBEK47-8PEpXoAwPWtfOcgZ2nHtesiXzKU",
    authDomain: "bootcampproject-e5bf7.firebaseapp.com",
    databaseURL: "https://bootcampproject-e5bf7.firebaseio.com",
    projectId: "bootcampproject-e5bf7",
    storageBucket: "bootcampproject-e5bf7.appspot.com",
    messagingSenderId: "749550629897"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var trainTime = "";
  var frequency = "";
  var minutesAway = "";
  var nextArrivalTime = "";
  

  $("#submit-btn").on("click", function(event) {
	
	event.preventDefault();

	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	trainTime =	$("#trainTime").val().trim();
	frequency =	$("#frequency").val().trim();
	
	

	database.ref().push({
		TrainName: trainName,
		Destination: destination,
		TrainTime: trainTime,
		Frequency: frequency,
	});
	console.log(trainName, destination, trainTime, frequency);

	// // Clears the input boxes
	// $("#trainName").val("");
	// $("#destination").val("");
	// $("#trainTime").val("");
	// $("#frequency").val("");

  });

  database.ref().on("child_added", function(child){

	  var tdTrainName = child.val().TrainName;
	  var tdDestination = child.val().Destination;
	  var tdTrainTime = child.val().TrainTime;
	  var tdFrequency = child.val().Frequency;

	  var trainStartTime = moment(trainTime, "hh:mm");

	  var nextTrainTime = moment().diff(moment.unix(trainTime, "X"), "minutes");
	  console.log(nextTrainTime);

	  
	  
	  $("#table-body").append("<tr><td>" + tdTrainName + "</td><td>" + tdDestination + "</td><td>" +
	  tdFrequency + "</td><td>" + tdTrainTime + "</td><td>" + nextTrainTime + "</td></tr>");
  });