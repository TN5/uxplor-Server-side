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
    res.json(body);
  });
});

router.post('/flag/:id', function(req, res, next) {
  var locationFeedback = {
    id: req.params.id,
    name: req.body.name,
    google_id: req.body.google_id,
    flag_type: req.body.flag_type,
    user_id: req.body.user_id
  }
  knex('location_feedback').insert(locationFeedback)
  .then(function() {
    res.send(locationFeedback)
  })
});

router.get('/badge/:id',function (req,res, next) {
  knex('user_badge')
    .where({'id': req.params.id})
    .then(function(badge){
      res.send(badge)
    })
})

module.exports = router;
