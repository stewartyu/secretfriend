var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var Account = require('./models/account');
var router = express.Router();

// passport config
passport.use(new Strategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

router.get('/auth/register', function(req, res) {
    res.render('index', { html: '', user: req.user });
});

router.post('/auth/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }
        passport.authenticate('local')(req, res, function () {
            res.render('index', { html: '', user: req.user });
        });
    });
});

router.get('/auth/signin', function(req, res) {
    res.render('signin', { user : req.user });
});

router.post('/auth/signin', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/auth/signout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
