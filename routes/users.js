const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Game = mongoose.model('games');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');


router.get('/dashboard', ensureAuthenticated, (req,res) => {
  res.render('users/dashboard');
});


router.get('/hosted', (req,res)=> {
  Game.find({host: req.user.id})
  .populate('user')
  .then(games => {
    res.render('users/hosted', {
      games:games
    });
  });
});

// so basically I want games shown here that the player
// signed up for
// also want ones the player is hosting
// so should signed up games be saved on the user obj?














module.exports = router;
