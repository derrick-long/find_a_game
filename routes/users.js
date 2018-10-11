const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Game = mongoose.model('games');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');
const {ratingsAverage} = require('../helpers/reviews');
const {starPercentage} = require('../helpers/reviews');


//test
router.get('/dashboard', ensureAuthenticated, (req,res) => {
  var currentDate = new Date();
  Game.find({
    $or: [
      {host:req.user.id, date:{ $gte:currentDate }},
      {'players.playerUser': req.user.id,date:{ $gte:currentDate }}
    ]
  })
  .sort('date')
  .then(games=>{
    res.render('users/dashboard', {upcomingGame: games[0]});
  });
  //find way to display upcoming game, so game with the date/time closest to current date/time

});



router.get('/profile/:id', ensureAuthenticated, (req,res) => {
  User.findOne({
    _id: req.params.id})
  .then(user=>{
    if(user){
      res.render('users/profile', {
        profileUser:user
      })
      .catch(err=>{
        console.log(err);
      });
    } else {
      req.flash('error_msg', 'User Not Found');
      res.redirect('/');
    }
  });


});

// get edit page
router.get('/profile/edit/:id', ensureAuthenticated, (req,res) => {
  User.findOne({
    _id: req.user.id})
  .then(user=>{
    if (req.params.id == req.user.id && user){
    res.render('users/profile_edit', {
      user:user
    });
  } else {
    req.flash('error_msg', "Invalid User");
    res.redirect('/');
  }
  }).catch(err=>{
    console.log(err);
  });
});


router.put('/:id', ensureAuthenticated, (req,res)=> {
  User.findOne({
    _id: req.user.id})
  .then(user=>{
    if(user){
    user.profileInfo = req.body.profileDescription;

    user.save()
      .then(user=>{
        req.flash('success_msg', 'Profile Updated!');
        res.redirect('/users/dashboard');
      }).catch(err=>{
        console.log(err);
      });
  } else {
    req.flash('User not Found!');
    res.redirect('/');
  }

  });
});


router.get('/hosted', ensureAuthenticated,(req,res, next)=> {
  Game.find({host: req.user.id})
  .populate('user')
  .then(games => {
    res.render('users/user_games', {
      games:games,
      title: "Hosted Games"
    });
  }).catch(err=>{
    console.log(err);
  });
});



router.get('/played', ensureAuthenticated, (req,res)=>{
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
      Game.findOne({_id:req.body.game_id})
        .then(game =>{
          game.numberOfPlayers += 1 ;
          game.save();
          req.flash('success_msg', 'Left Game!');
          res.redirect('/users/dashboard');
    });
  }).catch(err=>{
    console.log(err);
  });

  });


});


//need to add star interface





module.exports = router;
