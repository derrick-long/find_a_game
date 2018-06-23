const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Game = mongoose.model('games');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');
const {ratingsAverage} = require('../helpers/reviews');
const {starPercentage} = require('../helpers/reviews');


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



router.get('/played', (req,res)=>{
  Game.find({'players.playerUser': req.user.id})
  .populate('user')
  .then(games => {
    res.render('users/user_games', {
      games:games,
      title: "Games Played In"
    });
  });


//maybe change naming convention

router.delete('/drop_player', ensureAuthenticated, (req,res) => {
  Game.findOne(
    { _id: req.body.game_id})
  .then(game=>{
    game.update(
      { "$pull": {""}}
    )
  });

});



});


//okay so we need to make it so only one review can be added per user
//need to add star interface





module.exports = router;
