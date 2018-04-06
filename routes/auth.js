const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/google', (req,res) => {
  res.send('auth');
});


module.exports = router;
