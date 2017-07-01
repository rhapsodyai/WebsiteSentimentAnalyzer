var path = require('path');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//added
var nluemots;
var nluurl;
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '',
  'password': '',
  'version_date': '2017-02-27'
});

var parameters = {
  'url': 'https://www.google.com',
  'features': {
    'entities': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    },
    'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    }
  }
}

var emots;
var url = '';
// var AlchemyAPI = require('alchemy-api');
// var alchemy = new AlchemyAPI('yourapikeyhere');


app.get('/', function(req, res) {
    console.log(1);
    //render index.ejs file
    console.log('get')
    res.render('index.ejs', {val: emots});

});

app.post('/', function(req, res) {
    console.log(2);
    console.log('post')
    url = req.body.name
    parameters.url = url;
    analyze();
    console.log(req.body.name);
});

app.get('/ajax', function(req, res) {
    console.log(3);
    console.log('ajax')
    //console.log(req)
    //console.log(emots)
    res.send(emots);

});

app.listen(3000, function() {
    console.log('Running...')
})

function analyze() {
  console.log(4);
  natural_language_understanding.analyze(parameters, function(err, response) {
    if (err) {
      console.log('error:', err);
    }
    else {
      emotions = JSON.stringify(response, null, 2);
      console.log(emotions);
      emots = emotions;
    }
  });

    //emotion analysis
    // alchemy.emotions(url, {}, function(err, response) {
    //   if (err) throw err;
    //   // See http://www.alchemyapi.com/api/html-api-1 for format of returned object
    //   var emotions = response.docEmotions;
    //
    //   // Do something with data
    //   console.log(emotions)
    //   emots = emotions;
    // });

}
