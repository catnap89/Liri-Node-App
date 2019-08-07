
require("dotenv").config();       // to read and set any environment variables with the dotenv package
var keys = require("./keys.js");  //  to import the `keys.js` file and store it in a variable
var spotify = new Spotify(keys.spotify); // to access your keys information

