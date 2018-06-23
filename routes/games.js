const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Game = mongoose.model('games');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');
const errors = [];
const {ratingsAverage} = require('../helpers/reviews');




/// route for games, probably want sorted by most recent by default
// or closest?







router.get('/', (req,res)=> {
  Game.find({})
  .populate('host')
  .sort({date:'desc'})
  .then(games =>{
    res.render('games/index', {
      games: games
    });
  });
});

router.get('/add', (req,res)=>{
  res.render('games/add',{
    errors:errors
  });
});

//single game


router.get('/show/:id', (req,res)=> {
  Game.findOne({  _id: req.params.id })
  .populate('host')
  .populate('players.playerUser')
  .then(game => {
    res.render('games/show', {
      game: game
    });
  });
});

//edit

router.post('/', ensureAuthenticated, (req,res)=>{
  if(!req.body.title){
    errors.push({text: 'Please add a title.'});
  }
  if(!req.body.address){
    errors.push({text: 'Please add an address.'});
  }
  if(!req.body.zip){
    errors.push({text: 'Please add a zip code.'});
  }
  if(!req.body.number){
    errors.push({text: 'Please select a number of players for the game.'});
  }
  if(req.body.description == " "){
    errors.push({text: 'Please tell us about the game.'});
  }
  // maybe add a min length for description
  if(errors.length > 0){
    console.log(errors);
    res.render('games/add', {
      errors: errors,
      title: req.body.title,
      address: req.body.address,
      zip: req.body.zip,
      locationType: req.body.locationType,
      numberOfPlayers: req.body.number,
      experience: req.body.experience,
      description: req.body.description,
      host: req.user.id

    });

  } else {

  const newGame = {
  title: req.body.title,
  address: req.body.address,
  zip: req.body.zip,
  locationType: req.body.locationType,
  numberOfPlayers: req.body.number,
  experience: req.body.experience,
  description: req.body.description,
  host: req.user.id
  };
  //add a date created vs date of game and time

  //create game
  new Game(newGame)
  .save()
  .then(game => {
    req.flash('success_msg', 'Game Added!');
    res.redirect(`/games/show/${game.id}`);
  });
  }
});


//add player to game
router.post('/player/:id', ensureAuthenticated, (req, res)=>{
  Game.findOne({
    _id:req.params.id
  })
  .then(game => {

    if(req.user.id == game.host) {
        req.flash('error_msg', 'Hosts cannot be players');
        res.redirect('/games');
      }

    else if(game.players.length > 0){
      game.players.forEach(function(player){
        if(player.playerUser == req.user.id ){
            req.flash('error_msg', 'Already Registed!');
            res.redirect('/games');
        } else {

          const newPlayer = {
            playerUser: req.user.id
          };

          game.players.unshift(newPlayer);
          game.numberOfPlayers -= 1;
          game.save()
          .then(game =>{
            req.flash('success_msg', 'Signed up for game!');
            res.redirect('/users/dashboard');
          });
        }
      });
    } else {
      //dry up later
      const newPlayer = {
        playerUser: req.user.id
      };
      game.players.unshift(newPlayer);
      game.numberOfPlayers = game.numberOfPlayers - game.players.length;

      game.save()
      .then(game =>{
        req.flash('success_msg', 'Signed up for game!');

        res.redirect('/users/dashboard');
      });
    }
    });
});


//add host review

router.post('/host_review/:id', ensureAuthenticated, (req, res)=>{


  Game.findOne({
    _id: req.params.id
  })
  .populate('host')
  .then(game=> {
    game.host.hostReviews.forEach(function(review){
      if (review.game == game.id && review.reviewUser == req.user.id){
          req.flash('error_msg', 'You already added a review!');
          res.redirect('/');
      } else {

        const newHostReview = {
        game: game.id,
        reviewBody: req.body.hostReviewBody,
        reviewScore: req.body.hostReviewScore,
        reviewUser: req.user.id
      };
      //works probably need to clean it up though
      game.host.hostReviews.unshift(newHostReview);
      const newAverage = ratingsAverage(game.host,'host');
      game.host.hostReviewAverage = newAverage;
      game.host.save()
      .then(game=> {
        req.flash('success_msg', 'Review added!');
        res.redirect('/');
      });
    }
  });
  });
});


// add player review

router.post('/player_review/:id', ensureAuthenticated, (req, res)=>{


  User.findOne({
    _id: req.body.player_id
  })
  .then(user=>{
    if(user.playerReviews.find(function(review){
         return review.game == req.params.id && review.reviewUser == req.user.id;
      })){
        req.flash('error_msg', 'You already added a review!');
        res.redirect('/');
      } else {

    const newPlayerReview = {
      game: req.params.id,
      reviewBody: req.body.playerReviewBody,
      reviewScore: req.body.playerReviewScore,
      reviewUser: req.user.id
    };
    user.playerReviews.unshift(newPlayerReview);
    const newAverage = ratingsAverage(user,'player');
    user.playerReviewAverage = newAverage;
    user.save()
    .then(user=>{
      req.flash('success_msg', 'Review added!');
      res.redirect('/');
    });
  }
  });
});




// remove game
router.delete('/:id', ensureAuthenticated, (req,res) => {
  Game.remove({_id: req.params.id})
    .then(()=> {
      req.flash('success_msg', 'Game Removed!');
      res.redirect('/users/dashboard');
    });
});

// edit placeholder

module.exports = router;
