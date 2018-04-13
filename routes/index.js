const express = require('express');
const router = express.Router();
const passport = require('passport');



router.get('/', (req,res) => {
  res.render('index/welcome');
});

router.get('/about', (req,res)=> {
  res.render('index/about');
});














module.exports = router;
