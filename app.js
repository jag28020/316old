var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    passport = require('passport'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    passportConfig = require('./config/passport'),
    dbConfig = require('./config/db')

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url, function (err, res) {
  if (err)
    console.log ('ERROR connecting to: ' + dbConfig.url + '. ' + err)
  else 
    console.log ('Succeeded connected to: ' + dbConfig.url)
});

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.engine('mustache', require('hogan-middleware').__express)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(session({ 
  secret: 'ijsdfijsdf316Beautypijsvpi',
  resave: true,
  saveUninitialized: false,
  expires: new Date(Date.now() + (30 * 86400 * 1000)) //1 month in milliseconds
}))
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

//Configure passport
passportConfig(passport)

app.use(express.static(path.join(__dirname, 'public')))

//Connect routes
var index = require('./routes/index')(passport)
var api = require('./routes/api')(passport)

app.use('/', index)
app.use('/api', api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app