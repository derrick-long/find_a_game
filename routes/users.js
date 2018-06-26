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


router.get('/profile/:id', ensureAuthenticated, (req,res) => {
  User.findOne({
    _id: req.params.id})
  .then(user=>{
    res.render('users/profile', {
      profileUser:user
    });
  });


});

router.get('/profile/edit/:id', ensureAuthenticated, (req,res) => {
  User.findOne({
    _id: req.params.id})
  .then(user=>{
    res.render('users/profile_edit', {
      user:user
    });
  });
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




router.delete('/drop_player', ensureAuthenticated, (req,res) => {
  Game.findOneAndUpdate({_id:req.body.game_id},
  {$pull: { players : {"playerUser": req.user.id }}}
    ).then(()=> {
      //see if I can make this just one request
      Game.findOne({_id:req.body.game_id})
        .then(game =>{
          game.numberOfPlayers += 1 ;
          game.save();
          req.flash('success_msg', 'Left Game!');
          res.redirect('/users/dashboard');
    });
  });
  });


});


//need to add star interface





module.exports = router;
