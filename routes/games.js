const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Game = mongoose.model('games');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');
const errors = [];



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
  Game.findOne({
    _id: req.params.id
  })
  .populate('host')
  //loook up populate 
  //comment placeholder
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
        if(player.id == req.user.id ){
            req.flash('error_msg', 'Already Registed!');
            res.redirect('/games');
        } else {

          const newPlayer = req.user.id;

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

      const newPlayer = req.user.id;
      game.players.unshift(newPlayer);
      game.numberOfPlayers -= 1;
      game.save()
      .then(game =>{
        req.flash('success_msg', 'Signed up for game!');

        res.redirect('/users/dashboard');
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
