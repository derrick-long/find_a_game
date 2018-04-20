const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Game = mongoose.model('games');
const User = mongoose.model('users');


/// route for games, probably want sorted by most recent by default
// or closest?


router.get('/', (req,res)=> {
  res.render('games/index');
});

router.get('/add', (req,res)=>{
  res.render('games/add');
});

//single game

router.get('show/:id', (req,res)=> {
  Game.findOne({
    _id: req.params.id
  })
  .then(game => {
    res.render('games/show',{
      game:game
    });
  });
});



router.post('/', (req,res)=>{

  const newGame = {
  title: req.body.title,
  address: req.body.address,
  zip: req.body.zip,
  locationType: req.body.locationType,
  numberOfPlayers: req.body.number,
  experience: req.body.experience,
  description: req.body.description
  };

  //create game
  new Game(newGame)
  .save()
  .then(game => {
    res.redirect('/games/show/${game.id}');
  });
});


module.exports = router;
