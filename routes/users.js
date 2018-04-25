const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Game = mongoose.model('games');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');


router.get('/dashboard', (req,res) => {
  res.render('users/dashboard');
});
















module.exports = router;
