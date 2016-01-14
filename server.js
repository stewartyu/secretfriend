// Babel ES6/JSX Compiler
require('babel-register');

var _ = require('underscore');
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var Character = require('./models/character');
var config = require('./config');
var auth = require('./auth');

// mongoose
mongoose.connect('mongodb://localhost/secretfriend');

//mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.engine('jsx', require('express-react-views').createEngine());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', auth);


app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      console.log(req.session);
      var page = swig.renderFile('views/index.html', { html: html, user: req.session.passport.user });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});


var server = require('http').createServer(app);


server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
