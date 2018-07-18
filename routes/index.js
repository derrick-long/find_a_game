const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');


//so this function averages our values
//probably dry up by extrating a average method?
// or pass a second argument for host or player?





router.get('/', (req,res) => {
  res.render('index/welcome');
});

router.get('/about', (req,res)=> {
  res.render('index/about');
});

//map test

router.get('/map', (req, res)=> {
  res.render('index/google_map_test');
});

/// so eventually we're going to search for games on our backend within
// a radius of a zipcode, then send those to the front end and mark them on the map
// mongodb has a search based on this already we cna use google later
// no idea how to run a search function like that
// probably import something to mongo then use the place add marker function for each of the elements returned










module.exports = router;
