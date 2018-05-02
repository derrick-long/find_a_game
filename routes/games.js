const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Game = mongoose.model('games');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');



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

router.get('/add', ensureAuthenticated, (req,res)=>{
  res.render('games/add');
});

//single game


router.get('/show/:id', (req,res)=> {
  Game.findOne({
    _id: req.params.id
  })
  .populate('host')
  //comment placeholder
  .then(game => {
    res.render('games/show', {
      game: game
    });
  });
});

//edit

router.post('/', ensureAuthenticated, (req,res)=>{
  // need flash errors for form, also look up
  // zip verification etc

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
    res.redirect(`/games/show/${game.id}`);
  });
});

router.post('/player/:id', ensureAuthenticated, (req, res)=>{
  Game.findOne({
    _id:req.params.id
  })
  .then(game =>{
    game.players.forEach(function(player){
      //add host validation
      if(player.playerUser == req.user.id){
        req.flash('error_msg', 'Already registered!');
        res.redirect('/');
      } else {

        game.players.unshift(newPlayer);

        game.save()
        .then(game =>{
          res.redirect('/users/dashboard');
        })
        .catch((err)=> {
          res.send(err);
        });
        }
      });
    });
  });







module.exports = router;
