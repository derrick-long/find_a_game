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


module.exports = router;
