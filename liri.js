require("dotenv").config();

var fs = require("fs");
var request = require("request");

var keys = require("./keys.js");
//var env = require("./.env");
var twitter = require("twitter");
var spotify = require("spotify");
var omdb = require("omdbapi");
var inquirer = require("inquirer");
var liri = process.argv[2];

switch (liri) {
    case "my-tweets":
        getTwitter();
        break;

    case "spotify-this-song":
        getSpotify();
        break;

    case "movie-this":
        getOmdb();
        break;

    case "do-what-it-says":
        random();
        break;
}

// Twitter Function 
function getTwitter() {

    var twitter = require("twitter");
    var client = new twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    //Twitter username inside of a parameter object.
    var params = {
        screen_name: "ucf_test",
        count: 20
    };
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
};




// Get access token to use with requests to Spotify Web API.



// Spotify Function
function getSpotify() {

    var Spotify = require("node-spotify-api");

    var spotify = new Spotify(
        keys.spotify
    );

    //utilizing the spotify package, limits search to 3 results
    spotify.search({ type: 'track', query: input, limit: 3 }, function (err, data) {

        if (err) {

            return console.log('Error occurred: ' + err);
        }

        // console.log(data); 

        //creating a for loop to loop through the array:
        for (var i = 0; i < data.tracks.items.length; i++) {

            // console.log("Artist(s): " + data.tracks.items[i].artists[0].name);//This displayed only one artist
            // console.log(data.tracks.items[i]);
            for (var j = 0; j < data.tracks.items[i].artists.length; j++) {

                console.log("Artist(s): " + data.tracks.items[i].artists[j].name);

            }
            console.log("Song name: " + data.tracks.items[i].name);
            console.log("Preview link: " + data.tracks.items[i].external_urls.spotify);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("");

        }

    });
    
};

// Omdb Function
function getOmdb() {

    console.log(process.env.OMDB_ID);
    console.log(process.keys.omdb);

    var Omdb = new omdb({
        clientId: process.env.OMDB_ID,
    });

    omdb.search({
        search: 'game of thrones',  // required 
        type: 'series',             // optionnal  ['series', 'episode', 'movie'] 
        year: '2011',               // optionnal 
        page: '1'                   // optionnal (1 to 100) 
    }).then(res => {
        console.log('got response:', res);
    }).catch(console.error);

    omdb.get({
        id: 'tt0944947',            // optionnal (requires imdbid or title) 
        title: 'Game of Thrones',   // optionnal (requires imdbid or title) 
        season: 1,                  // optionnal 
        episode: 1,                 // optionnal 
        type: 'series',             // optionnal ['series', 'episode', 'movie'] 
        plot: 'full',               // optionnal (defaults to 'short') 
        tomatoes: true,             // optionnal (get rotten tomatoes ratings) 
        year: '2011'                // optionnal 
    }).then(res => {
        console.log('got response:', res);
    }).catch(console.error);
}




