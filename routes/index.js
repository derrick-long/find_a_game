const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');


//so this function averages our values
//probably dry up by extrating a average method?
// or pass a second argument for host or player?


function hostRatingsAverage(user) {
  let total = 0;
  let divide_by = user.hostReviews.length;
  user.hostReviews.forEach(function(review){
    total += review.reviewScore;
  });
  return total/divide_by;
}




router.get('/', (req,res) => {
  res.render('index/welcome');
});

router.get('/about', (req,res)=> {
  res.render('index/about');
});

//star test

router.get('/stars', (req, res)=> {
  res.render('index/star_test');
});













module.exports = router;
