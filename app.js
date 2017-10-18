var express = require('express');
var cookieParser = require('cookie-parser');
var request = require('request');
var morgan = require('morgan');
var config = require('config');

var app = express();
var portNumber = 5000;


//Data holder for json
var jsonDataHolder;


//for language implementation
app.use(cookieParser());

if(process.env.NODE_ENV !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}


// Home - Simple Hello
app.get('/', function(req, res) {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)

    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
    //  console.log(jsonDataHolder);
    res.send('Hello There')
});



// List all sports ( top level )
app.get('/sports', function(req, res) {
    // console.log(jsonDataHolder);
    var sportsHolder = JSON.parse(jsonDataHolder);
    console.log(sportsHolder);
    res.json(sportsHolder.sports);
});


// List events for each sport
app.get('/sports/:sportId', function(req, res) {
    //get the sport
    console.log(req.params.sportId);
    var sportIdRequested = req.params.sportId;

    // get sport feed and parse
    var singleSportsHolder = JSON.parse(jsonDataHolder);


    console.log(singleSportsHolder.sports.length);

    //sort events by sport
    for (var i = 0; i < singleSportsHolder.sports.length; i++) {

        if (singleSportsHolder.sports[i].title == sportIdRequested) {
            var responseForSingleSport = singleSportsHolder.sports[i];
            console.log(responseForSingleSport);
            res.json(responseForSingleSport);
        }
    }

});


// List all outcomes for a given sport event by ID
app.get('/sports/:sportId/events/:eventId', function(req, res) {
    console.log(req.params.sportId);
    console.log(req.params.eventId);
    var sportIdRequested = req.params.sportId;
    var eventIdRequested = req.params.eventId;

    // get sport feed and parse
    var singleSportsHolder = JSON.parse(jsonDataHolder);

    console.log(singleSportsHolder.sports.length);

    //search events by sport
    for (var i = 0; i < singleSportsHolder.sports.length; i++) {

        if (singleSportsHolder.sports[i].title == sportIdRequested) {

            //search events by eventid
            for (var p = 0; p < singleSportsHolder.sports.length; p++) {

                if (singleSportsHolder.sports[i].events[p].id == eventIdRequested) {
                    console.log('event found');
                    var responseForSingleSportEvent = singleSportsHolder.sports[i].events[p];
                    console.log(responseForSingleSportEvent);
                    res.json(responseForSingleSportEvent);

                }
            }
        }
    }

});

app.listen(portNumber, function() {
    console.log("App Listening on port: " + portNumber);
    //Could also use request and cache the json response as a flat file? ( refresh each "X seconds" )?
    request.get('http://www.betvictor.com/live/en/live/list.json', function(err, response) {
        jsonDataHolder = response.body;
        // console.log(response.body);
    });
});

module.exports = app; // for testing
