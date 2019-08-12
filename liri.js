
// ________________________________
// DEPENDENCIES
// ================================
require("dotenv").config();                 // to read and set any environment variables with the dotenv package
var fs = require("fs");
var Spotify = require("node-spotify-api");  // Import the node-spotify-api NPM package.
var keys = require("./keys.js");            // to import the `keys.js` file and store it in a variable
var spotify = new Spotify(keys.spotify);    // to access your keys information
var axios = require("axios");               // Include the axios npm package
var moment = require("moment");
// ________________________________
// STORED QUERY ARGUMENTS IN ARRAY
// ================================
var action = process.argv[2];
var nodeArgs = process.argv.slice(3); // Store all of the arguments in an array (nodeArgs) starting from index [3] of process.argv array
var queryThis = "";                        // Create an empty variable for holding the queryThis name

for (var i = 0; i < nodeArgs.length; i++) {   // Loop through all the words in the node argument
  if (i > 0 && i < nodeArgs.length) {         // When there are more than one process.argvs for queryThis name. 
    queryThis = queryThis + "+" + nodeArgs[i];         
  } else {                                    // When there is only one process.argv for queryThis name. i = 0 && i < nodeArgs.length
    queryThis += nodeArgs[i];
  }
}
// ________________________________
// SWITCH
// ================================
switch (action) {
  case "concert-this":
    concertThis(queryThis);
    break;
  case "spotify-this-song":
    if (queryThis) {
      spotifyThis(queryThis);
    } else {
      spotifyThis("The Sign ace of base");
    }
    break;
  case "movie-this":
    if (queryThis) {
      movieThis(queryThis);
    } else {
      movieThis("Mr.Nobody");
    }
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;

}
// ________________________________
// FUNCTIONS
// ================================
function concertThis(artist) {        // bands in town. Take in queryThis parameter to search events of the artist declared in queryThis

  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  // console.log("queryURL: " + queryURL);
 
  axios 
    .get(queryURL)                    // The axios.get function takes in a URL and returns a promise (just like $.ajax)
    .then(function(response) {
      var events = response.data;     // this is array. If there are one event data it's in [0].
      var logCommand = "concert-this"; // for log.txt
      events.forEach(function (evt) {      
        var eventData = [                                          // build event block
          '\n',
          'Venue: ' + evt.venue.name,                              // Name of the venue
          'Location: ' + evt.venue.city + ' ' + evt.venue.country, // Venue location
          'Date: ' + moment(evt.datetime).format('L')              // Date of the Event (use moment to format this as "MM/DD/YYYY")
        ].join('\n');
        console.log(eventData);
        log(eventData, artist, logCommand);                                    // output the event block
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
// ======================================================

function spotifyThis(song) {

 spotify
  .search({ type: 'track', query: song, limit: 10 })
  .then(function(response) {
    var tracks = response.tracks.items; //array
    var logCommand = "spotify-this-song"; // for log.txt
   
    tracks.forEach(function (track) {
      //build artist block
      var artists = track.artists; //array
      var artistsData = [];
      artists.forEach(function (artist) {
        artistsData = [
          artist.name
        ].join(' * ');
      });

      var trackData = [                 // build event block
        '\n',
        'Artist (s): ' + artistsData,   // * Artist(s)
        'Song: ' + track.name,          // * The song's name
        'Album: ' + track.album.name,   // * The album that the song is from
        track.preview_url ? 'Preview URL: ' + track.preview_url : 'Preview URL: ' + 'none provided' // * A preview link of the song from Spotify
      ].join('\n');

      console.log(trackData);
      log(trackData, song, logCommand);
    });
  })
  .catch(function(err) {
    console.log(err);
  });
}

// =================================================

function movieThis(movieName) {

  var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(queryURL).then(
  function(response) {
    var movie = response.data;
    var logCommand = "movie-this"; // for log.txt
    var movieData = [
      "\n",
      "Title: " + movie.Title,                                      // Title of the movie
      "Released Year: " + movie.Year,                               // Year the movie came out.
      "IMDB Rating: " + movie.imdbRating,                           // IMDB Rating of the movie.
      "Rotten Tomato Rating: " + JSON.stringify(movie.Ratings[1]),  // Rotten Tomatoes Rating of the movie.
      "Country: " + movie.Country,                                  // Country where the movie was produced.
      "Language: " + movie.Language,                                // Language of the movie.
      "Plot of the movie: " + movie.Plot,                           // Plot of the movie.
      "Actors: " + movie.Actors,                                    // Actors in the movie.
    ].join("\n");                                                   // takes all of the elements in array and join them as a string. Uses "\n", new line as a separator
      
    console.log(movieData);
    log(movieData, movieName, logCommand);

  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

}

// =================================================

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      console.log(error);
    }
    var command = data.split(",");
    var action = command[0];
    var query = command[1].replace("\"", "").replace("\"", "");

    console.log(command);

    if (action === "concert-this") {
      concertThis(query);
    } else if (action === "spotify-this-song") {
      spotifyThis(query);
    } else if (action === "movie-this") {
      movieThis(query);
    }

    console.log(action);
    console.log(query);
 
 
  })
}

// =================================================

function log(data, info, logCommand) { // log(param1, param2) and use parameters to log the data in log.txt

  if (logCommand === "concert-this") {
    var command = "concert-this " + info;
  } else if (logCommand === "spotify-this-song") {
    var command = "spotify-this-song " + info;
  } else if (logCommand === "movie-this") {
    var command = "movie-this " + info;
  }
  var log = "\n" + "Command: " + command + "\n" + data + "\n" + "===========" + "\n";
  fs.appendFile("log.txt",log, function(error) {
    if (error) {
      return console.log(error);
    }
    
  })
}