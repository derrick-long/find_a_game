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



//connect mongoose

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/find-game-dev')
  .then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



//load models
require('./models/game');
require('./models/user');

//Load Routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const games = require('./routes/games');


//set view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

//passport config

require('./config/passport')(passport);


//passport middleware

app.use(passport.initialize());
app.use(passport.session());

//global vars


//gets curr user if logged
app.use((req, res, next)=> {
  res.locals.user = req.user || null;
  next();
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use('/auth', auth);
app.use('/', index);
app.use('/games', games);



//set server
app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
