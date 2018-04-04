const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const ejs = require('ejs');



//set view engine
app.set('view engine', 'ejs');

//simple route

app.get('/', (req,res)=>{
  res.render('home');
});



//connect mongoose

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/find-game-dev')
  .then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err));




//set server
app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
