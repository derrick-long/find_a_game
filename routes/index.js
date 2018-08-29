const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');


//so this function averages our values
//probably dry up by extrating a average method?
// or pass a second argument for host or player?





router.get('/', (req,res) => {
  res.render('index/welcome');
});

router.get('/about', (req,res)=> {
  res.render('index/about');
});

router.get('/test', (req,res) => {
  res.render('index/test');
});


router.get('/endpoint', function(req, res){
  //obviously not getting something here, sends the data, but then
  // i need to use it to search
  User.findOne({
    firstName: req.query.name})
    .then(user=>{
      res.send({user:user});
      });

});









module.exports = router;
