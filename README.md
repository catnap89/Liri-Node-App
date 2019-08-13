# Liri-Node-App

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data based on one of four commands:

  * `concert-this`

  * `spotify-this-song`

  * `movie-this`

  * `do-what-it-says`

## Getting Started

- Clone down repo.
- Node.js - Download the latest version of Node https://nodejs.org/en/
- Run command 'npm install' in Terminal or GitBash to install npm packages needed for this app.
- Create .env file to store your spotify id and secret. This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github; keeping our API key information private.
- Run one of the commands below in Terminal or GitBash.

## What Each Command Does

1. `node liri.js concert-this <artist/band name>`

  * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

    * Name of the venue
    * Venue location
    * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song <song name>`

  * Shows the following information about the song in terminal/bash window.
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

  * If no song name is provided, it will default to **"The Sign"** by Ace of Base.

3. `node liri.js movie-this <movie name>`

  * Shows the following information in terminal/bash.

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.

  * If no movie name is provided, it will default to **"Mr. Nobody"**

4. `node liri.js do-what-it-says`

  * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    * the text inside of random.txt is in following format: `command,"name"`.
    * the `command` before `,` is used to call the related function.
    * the `name` after `,` is what the api query will be about.
    * For example: if random.txt has `spotify-this-song,"I want it That Way"`, it should run `spotify-this-song` for "I Want it That Way"

## Video of the App functioning
[![Watch the video](https://img.youtube.com/vi/jimBos0julc/maxresdefault.jpg)](https://youtu.be/jimBos0julc)


## Tech used
- Node.js
- Axios NPM Package - https://www.npmjs.com/package/axios
- Node-Spotify-API NPM Package - https://www.npmjs.com/package/node-spotify-api
- Moment NPM Package - https://www.npmjs.com/package/moment
- DotEnv NPM Package - https://www.npmjs.com/package/dotenv
- .gitignore - to tell git not to track files such as node_modules, .DS_Store and .env and thus they won't be committed to Github.


## Built With

* Visual Studio Code - Text Editor

## Authors

* **Youngwoo Cho** - *Node JS* - [Youngwoo Cho](https://github.com/catnap89)