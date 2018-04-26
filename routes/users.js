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

//so now we need to think about a played router

router.get('/played', (req,res)=>{
  Game.find({"players.playerUser":req.user.id})
  .populate('user')
  .then(games => {
    res.render('users/played', {
      games:games
    });
  });
});









module.exports = router;
