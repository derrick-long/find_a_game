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
const methodOverride = require('method-override');



//load models
require('./models/game');
require('./models/user');

//passport config

require('./config/passport')(passport);

//load keys
const keys = require('./config/keys');



//Load Routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const games = require('./routes/games');
const users = require('./routes/users');


//body parser middle
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



//connect mongoose

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/find-game-dev')
  .then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// cookie parser
  app.use(cookieParser());

//session
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));



//set view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);




//passport middleware

app.use(passport.initialize());
app.use(passport.session());


//method override middleware
app.use(methodOverride('_method'));


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
app.use('/users', users);


//set server
app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
