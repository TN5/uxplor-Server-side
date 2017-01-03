var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getlist', function(req, res, next) {
  var type = req.query.type;
  var location = req.query.location;
  var radius = req.query.radius;
  var key = process.env.GOOGLE_API_KEY;
  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + location + '&radius=' + radius + '&type=' + type + '&key=' + key;
  request(url, function(error, response, body) {
    console.log(body);
    res.send(body);
  });
});

module.exports = router;
