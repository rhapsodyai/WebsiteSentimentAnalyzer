var path = require('path');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var emots;
var url = '';
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('yourapikeyhere');


app.get('/', function(req, res) {
    //render index.ejs file
    console.log('get')
    res.render('index.ejs', {val: emots});
});

app.post('/', function(req, res) {
    console.log('post')
    url = req.body.name
    analyze();
    console.log(req.body.name);
});

app.get('/ajax', function(req, res) {
    console.log('ajax')
    //console.log(req)
    //console.log(emots)
    res.send(emots);
    
});

app.listen(3000, function() {
    console.log('Running...')
})

function analyze() {
    //emotion analysis
    alchemy.emotions(url, {}, function(err, response) {
      if (err) throw err;
      // See http://www.alchemyapi.com/api/html-api-1 for format of returned object
      var emotions = response.docEmotions;

      // Do something with data
      console.log(emotions)
      emots = emotions;
    });
    
}
