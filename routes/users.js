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

//broken query

router.get('/played', (req,res)=>{
  Game.find({"players.playerUser.id":req.user.id})
  .populate('user')
  .then(games => {
    res.render('users/user_games', {
      games:games,
      title: "Games Played In"
    });
  });
});

//maybe change naming convention

router.post('/playerReview/:id', ensureAuthenticated, (req, res)=>{
//figure out if this goes here or with the games
  const reviewedGame =
  Game.findOne({
    _id:req.params.id
  });

  User.findOne({
    _id:reviewedGame.host
  })
  .then(user =>{
    res.send(user);
    // const newHostReview = {
    //   game: reviewedGame.id,
    //   reviewBody: req.body.playerReviewBody,
    //   reviewScore: 1, // come back and change
    //   reviewUser: req.user.id
    // };
    //
    // user.
    // req.flash('success_msg', 'review added!');

  });
});





// add flash alert for not being authenticated



module.exports = router;
