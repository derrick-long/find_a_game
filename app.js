const express = require('express');
const app = express();
const flash = require('connect-flash');
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
const pluralize = require('pluralize');
const dateFormat = require('dateformat');
const NodeGeocoder = require('node-geocoder');





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

mongoose.connect(keys.mongoURI, {

})
.then(()=>console.log('MongoDB Connected...'))
.catch(err=> console.log(err));

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

//use flash
app.use(flash());

//use dateformat in views

app.locals.dateformat = require('dateformat');

//passport middleware

app.use(passport.initialize());
app.use(passport.session());


//method override middleware
app.use(methodOverride('_method'));


//local vars, for flash and user
app.use((req, res, next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg') ;
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


//ejs helpers
app.locals.truncate = function(str, len){
    if (str.length > len && str.length > 0) {
			var new_str = str + " ";
			new_str = str.substr(0, len);
			new_str = str.substr(0, new_str.lastIndexOf(" "));
			new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
			return new_str + '...';
		}
		return str;
};

app.locals.timeChange =  function(time) {
    var timeSplit = time.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    return(hours + ':' + minutes + ' ' + meridian);
  };

//pluralize helper

app.locals.makePlural = function(item, number){
  return pluralize(item, number);
};


//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//global var for api
global.apiURL = keys.apiURL;




//use routes
app.use('/auth', auth);
app.use('/', index);
app.use('/games', games);
app.use('/users', users);


//set server
app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
