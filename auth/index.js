var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');
var User = require('./user');
var bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'locked'});
});

router.get('/params', function(req, res, next) {

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
  if(validUser(req.body)) {
    User.getUserByEmail(req.body.email)
    .then(function(user) {
      if(!user) {
        bcrypt.hash('req.body.password', 8)
        .then(function(hash) {
          var user = {
            name: req.body.name,
            email: req.body.email,
            password: hash
          }
          User.create(user)
          .then(function(id){
            res.json({ id,message: '✅ 🔐' })
          })
        })
      } else {
          next(new Error('Invalid Input'))
      }
    })
  }
})

router.post('/signin', function(req, res, next) {
  if(validUser(req.body)) {
    User.getUserByEmail(req.body.email)
    .then(function(user) {
      if(user) {
        console.log(user);
        bcrypt.compare(req.body.password, user.password)
          .then(function(err,result) {
            res.json({
              result,
              message: "Signed In! 🔓"
            })
            // next(res.redirect('/params'))
          })
      } else {
        next(new Error('Invalid Signin'))
      }
  })
  } else {
    next(new Error('Invalid Input'))
  }
})


module.exports = router;
