
require("dotenv").config();       // to read and set any environment variables with the dotenv package
var fs = require("fs");
// var keys = require("./keys.js");  //  to import the `keys.js` file and store it in a variable
// var spotify = new Spotify(keys.spotify); // to access your keys information
var axios = require("axios");     // Include the axios npm package
var moment = require("moment");

var action = process.argv[2];

switch (action) {
  case "concert-this":
    concertThis();
    break;

}


function concertThis() {  // bands in town 
  // Store all of the arguments in an array
  var nodeArgs = process.argv.slice(3); // starts from index [3] of process.argv array

  // Create an empty variable for holding the movie name
  var artist = "";

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 0; i < nodeArgs.length; i++) {

    if (i > 0 && i < nodeArgs.length) {
      artist = artist + "+" + nodeArgs[i];
    } else {
      artist += nodeArgs[i];

    }
  }
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  console.log("queryURL: " + queryURL);

  // Run the axios.get function...
  // The axios.get function takes in a URL and returns a promise (just like $.ajax)
  axios 
    .get(queryURL)
    .then(function(response) {
      var events = response.data; // this is array. If there are one event data it's in [0].
      events.forEach(function (evt) {
        //    * Name of the venue
        //    * Venue location
        //    * Date of the Event (use moment to format this as "MM/DD/YYYY")
        //build event block
        var eventData = [
          'Venue: ' + evt.venue.name,
          'Location: ' + evt.venue.city + ' ' + evt.venue.country,
          'Date: ' + moment(evt.datetime).format('L') //MM/DD/YYYY
        ].join('\n');
        //output the event block
        console.log(eventData);
        log(eventData, artist);
      });  
      
    })
    .catch(function(error) {
      if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

}

function log(data, info) { // log(param1, param2) and use parameters to log the data in log.txt
  var log = "\n" + "About: " + info + "\n" + data + "\n" + "===========" + "\n";
  fs.appendFile("log.txt",log, function(error) {
    if (error) {
      return console.log(error);
    }
    
  })
}