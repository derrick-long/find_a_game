const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Game = mongoose.model('games');
const User = mongoose.model('users');


function hostRatings(user) {
  let average = 0;
  user.hostReviews.forEach(function(review){
    console.log(review.reviewScore);
  });
}




router.get('/', (req,res) => {
  res.render('index/welcome');
});

router.get('/about', (req,res)=> {
  res.render('index/about');
});

//star test

router.get('/stars', (req, res)=> {
  hostRatings(req.user);
});













module.exports = router;
