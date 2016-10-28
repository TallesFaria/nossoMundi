var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var router = express.Router();

passport.use(new Strategy({
    clientID: '1802762493346523',
    clientSecret: 'acadbcae161c4f46e6c73770ddeb2a1a',
    callbackURL: '/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  if (req.user && req.isAuthenticated()) {
    if (req.cookies.universityId) {
      res.redirect('/shops/' + req.cookies.universityId);
    } else {
      res.redirect('/universities');
    }
  } else {
    res.redirect('/login');
  }
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: "FreeMarket H8" });
});

router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
