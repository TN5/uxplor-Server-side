var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/badges', function(req, res, next) {
  knex('badge').select()
  .then(function(data) {
    res.json(data);
  })
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

router.post('/flag', function(req, res, next) {
  var locationFeedback = {
    name: req.body.name,
    google_id: req.body.google_id,
    flagged: req.body.flagged,
    flag_type: req.body.flag_type,
    user_id: req.body.user_id
  }
  knex('location_feedback').insert(locationFeedback)
  .then(function() {
    res.send(locationFeedback)
  })
});

router.get('/flag', function(req, res, next) {
  return knex('location_feedback').then(function (flagged) {
    res.json(flagged)
  })
})

router.post('/feedback', function (req, res, next){
  var feedback = {
    rating: req.body.rating
  }
  knex('feedback').insert(feedback)
    .then(function(){
      res.send(feedback)
    })
})

router.get('/feedback', function(req, res, next) {
  return knex('feedback').then(function (rating) {
    res.json(rating)
  })
})

router.get('/badge/:id',function (req,res, next) {
  knex.from('badge')
    .innerJoin('user_badge', 'badge.id', 'user_badge.badge_id')
    .where('user_id', req.params.id)
    .then(function (badges) {
      res.send(badges)
    })
})


router.post('/badge', function(req, res, next){
  knex('user_badge').insert(req.body)
    .then(function() {
      res.json(req.body)
    })
});

router.put('/flag/:id', function(req, res, next) {
  knex('location_feedback')
  .where('id', req.params.id)
  .update(req.body).returning('id')
  .then(function(id) {
    res.send(id)
  })
})

module.exports = router;
