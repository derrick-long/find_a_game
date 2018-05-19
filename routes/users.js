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
  Game.find({"players": { "_id" : req.user.id} })
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
  Game.findOne({
    _id: req.params.id
  })
  .populate('host')
  .then(game=> {
    const newHostReview = {
      game: game.id,
      reviewBody: req.body.playerReviewBody,
      reviewScore: 1, // come back and change
      reviewUser: req.user.id
    };

    game.host.hostReviews.unshift(newHostReview);
    game.host.save()
    .then(game=> {
      req.flash('success_msg', 'Review added!');
      res.redirect('/');
    });
  });


});


//okay so we need to make it so only one review can be added per user
//need to add star interface





module.exports = router;
