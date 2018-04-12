const express = require('express');
const router = express.Router();
const passport = require('passport');



router.get('/', (req,res) => {
  res.render('index/welcome');
});
















module.exports = router;
