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


router.get('/hosted',(req,res, next)=> {
  Game.find({host: req.user.id})
  .populate('user')
  .then(games => {
    res.render('users/user_games', {
      games:games,
      title: "Hosted Games"
    });
  });
});

//so now we need to think about a played router

router.get('/played', (req,res)=>{
  Game.find({"players.playerUser":req.user.id})
  .populate('user')
  .then(games => {
    res.render('users/user_games', {
      games:games,
      title: "Games Played In"
    });
  });
});

router.post('/playerReview/:id', ensureAuthenticated, (req, res)=>{
//figure out if this goes here or with the games
  const reviewedGame =
  Game.findOne({
    _id:req.params.id
  });

  User.findOne({
    _id:req.user.id
  })
  .then(user =>{
    res.send(user);


  });
});





// add flash alert for not being authenticated



module.exports = router;
