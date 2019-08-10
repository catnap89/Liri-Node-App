
// ________________________________
// DEPENDENCIES
// ================================
require("dotenv").config();                 // to read and set any environment variables with the dotenv package
var fs = require("fs");
var Spotify = require("node-spotify-api");  // Import the node-spotify-api NPM package.
var keys = require("./keys.js");            //  to import the `keys.js` file and store it in a variable
var spotify = new Spotify(keys.spotify);    // to access your keys information
var axios = require("axios");               // Include the axios npm package
var moment = require("moment");
// ________________________________
// SWITCH
// ================================
var action = process.argv[2];

switch (action) {
  case "concert-this":
    concertThis();
    break;
  case "spotify-this-song":
    spotifyThis();
    break;

}
// ________________________________
// FUNCTIONS
// ================================
function concertThis() {                      // bands in town 
  var nodeArgs = process.argv.slice(3);       // Store all of the arguments in an array(nodeArgs). Starts from index [3] of process.argv array
  var artist = "";                            // Create an empty variable for holding the artist name

  for (var i = 0; i < nodeArgs.length; i++) { // Loop through all the words in the node argument
    if (i > 0 && i < nodeArgs.length) {
      artist = artist + "+" + nodeArgs[i];    // And do a little for-loop magic to handle the inclusion of "+"s
    } else {
      artist += nodeArgs[i];
    }
  }
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  // console.log("queryURL: " + queryURL);
 
  axios 
    .get(queryURL)                    // The axios.get function takes in a URL and returns a promise (just like $.ajax)
    .then(function(response) {
      var events = response.data;     // this is array. If there are one event data it's in [0].
      events.forEach(function (evt) {      
        var eventData = [                                          // build event block
          '\n',
          'Venue: ' + evt.venue.name,                              // Name of the venue
          'Location: ' + evt.venue.city + ' ' + evt.venue.country, // Venue location
          'Date: ' + moment(evt.datetime).format('L')              // Date of the Event (use moment to format this as "MM/DD/YYYY")
        ].join('\n');
        console.log(eventData);
        log(eventData, artist);                                    // output the event block
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

function spotifyThis() {
  var nodeArgs = process.argv.slice(3); // Store all of the arguments in an array (nodeArgs) starting from index [3] of process.argv array
  var song = "";                        // Create an empty variable for holding the song name

  for (var i = 0; i < nodeArgs.length; i++) {   // Loop through all the words in the node argument
    if (i > 0 && i < nodeArgs.length) {
      song = song + "+" + nodeArgs[i];          // And do a little for-loop magic to handle the inclusion of "+"s
    } else {
      song += nodeArgs[i];
    }
  }

  // if (song === "") {
  //   song = "The Sign";
  //   var artist = "Ace of Base";
  //   var id = '5UwIyIyFzkM7wKeGtRJPgB'
  //   spotify
  //     .request('https://api.spotify.com/v1/tracks/' + id + '/7yCPwWs66K8Ba5lFuU2bcx')
  //     .then(function(data) {
  //       console.log(data); 
  //     })
  //     .catch(function(err) {
  //       console.error('Error occurred: ' + err); 
  //     });
  //   return;
  // }

 spotify
  .search({ type: 'track', query: song, limit: 10 })
  .then(function(response) {
    var tracks = response.tracks.items; //array
    console.log(tracks);
   
    tracks.forEach(function (track) {

      //build artist block
      var artists = track.artists; //array
      var artistsData = [];
      artists.forEach(function (artist) {
        artistsData = [
          artist.name
        ].join(' * ');
      });

      // build event block
      var trackData = [
        '\n',
        'Artist (s): ' + artistsData,   // * Artist(s)
        'Song: ' + track.name,          // * The song's name
        'Album: ' + track.album.name,   // * The album that the song is from
        track.preview_url ? 'Preview URL: ' + track.preview_url : 'Preview URL: ' + 'none provided' // * A preview link of the song from Spotify
      ].join('\n');

      console.log(trackData);
      log(trackData, song);
    });
  })
  .catch(function(err) {
    console.log(err);
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