var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'locked'});
});

function validUser(user) {
  var validEmail = typeof user.email == 'string' &&
                    user.email.trim() != '';
  var validPassword = typeof user.password == 'string' &&
                    user.password.trim() != '' &&
                    user.password.length >= 6;
  return validEmail && validPassword;
}

router.post('/signup', function(req, res, next) {
  if(validUser(req.body)){
    res.json({
      message: "valid input"
    });
  } else {
    next(new Error('Invalid Input'))
  }
});

module.exports = router;
