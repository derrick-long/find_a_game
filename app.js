const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

app.get('/', (req,res)=>{
  res.send('howdy');
});

app.get('/about', (req,res)=>{
  res.send('about');
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
