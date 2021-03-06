var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var Account = require('./models/account');
var router = express.Router();

// passport config
passport.use(new Strategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

router.get('/auth/signup', function(req, res) {
    res.render('index', { html: '', user: req.session.passport.user });
});

router.post('/auth/signup', function(req, res) {
    Account.findOne({ username: req.body.username }, function(err, account) {
        if (account) {
            return res.send({ error: 'There is already a user with this name.' });
        }

        Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
            if (err) {
                return res.render('index', { error : err });
            }
            passport.authenticate('local')(req, res, function () {
                res.send(req.session.passport.user);
            });
        });
    });
});

router.get('/auth/signin', function(req, res) {
    res.render('index', { user : req.session.passport.user });
});

router.post('/auth/signin', passport.authenticate('local'), function(req, res) {
    res.send(req.session.passport.user);
});

router.get('/auth/signout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/auth/me', function(req, res) {
    var user = req.session.passport.user || {};
    res.send(user);
});

module.exports = router;
