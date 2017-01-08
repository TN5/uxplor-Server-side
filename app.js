var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var auth = require('./auth/index');

var app = express();
var cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
<<<<<<< HEAD
  origin: 'https://uxplor-7ce2a.firebaseapp.com'||'http://127.0.0.1:8080',
=======
  origin: ['https://localhost:8080','https://127.0.0.1:8080','https://uxplor-7ce2a.firebaseapp.com'],
>>>>>>> 7a7acaac12452ad0e269835661e540f868dfa3c2
  credentials:true
}));

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    "message": err.message,
    "error": req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
