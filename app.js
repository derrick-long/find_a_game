const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const ejs = require('ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const passport = require('passport');

//Load Routes
const auth = require('./routes/auth');

//load models

require('./models/user');

//set view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);


//simple route

app.get('/', (req,res)=>{
  res.render('home');
});

//passport config

require('./config/passport')(passport);



//connect mongoose

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/find-game-dev')
  .then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use('/auth', auth);

//set server
app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
