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













module.exports = router;
