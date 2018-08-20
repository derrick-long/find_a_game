const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Game = mongoose.model('games');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');
const errors = [];
const {ratingsAverage} = require('../helpers/reviews');
const NodeGeocoder = require('node-geocoder');



var options = {
  provider: 'google',
  httpAdapter: 'https', // Default // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);



/// route for games, probably want sorted by most recent by default
// or closest?


//delete later
router.get('/test', (req,res)=>{
  res.render('index/test');
  // Game.findOne({  _id:"5b6f157644a01d0606d320c8"})
  // .then(game => {
  //     console.log(game.mapInfo);
  // });

});



router.get('/map', (req, res)=> {
  res.render('index/google_map_test');
});

router.post('/map', (req,res)=> {
  var query_lat;
  var query_long;
  geocoder.geocode(req.body.searchZip)
    .then(function(response){
      query_lat = response[0].latitude;
      query_long = response[0].longitude;
      Game.find({
       location: {
        $near: {
         $maxDistance: 100000000,
         $geometry: {
          type: "Point",
          coordinates: [query_lat, query_long]
         }
        }
       }
      }).find((error, results) => {
       if (error) console.log(error);
       console.log(JSON.stringify(results, 0, 2));
      });
    })
    .catch(function(err){
      console.log(err);
    });
});



router.post('/test', (req,res)=> {
  // okay so make a request with

    geocoder.geocode('23505')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(err){
        console.log(err);
    });

  Game.find({
  location: {
   $near: {
    $maxDistance: 10000,
    $geometry: {
     type: "Point",
     coordinates: [48.869384, 3]
    }
   }
  }
 }).find((error, results) => {
  if (error) console.log(error);
  console.log(JSON.stringify(results, 0, 2));
 });



    // fix catch
    res.redirect('/');
});


router.get('/', (req,res)=> {
  const currentDate = new Date();
  Game.find({ date: { $gt: currentDate}})
  .populate('host')
  .sort({date:'desc'})
  .then(games =>{
    res.render('games/index', {
      games: games
    });
  });
});

// add game

router.get('/add', (req,res)=>{
  res.render('games/add',{
    errors:errors
  });
});


//single game

router.get('/show/:id', (req,res)=> {
  Game.findOne({  _id: req.params.id })
  .populate('host')
  .populate('players.playerUser')
  .then(game => {
    res.render('games/show', {
      game: game
    });
  });
});

// post new game
// need to make a new query with $near taking a zip from front end
// then returning array of games that are near it
// then make map markers for that game
// center in the zip of the query/addy



router.post('/', ensureAuthenticated, (req,res)=>{
  var lat;
  var long;
  if(!req.body.title){
    errors.push({text: 'Please add a title.'});
  }
  if(!req.body.address){
    errors.push({text: 'Please add an address.'});
  }
  if(!req.body.zip){
    errors.push({text: 'Please add a zip code.'});
  }
  if(!req.body.number){
    errors.push({text: 'Please select a number of players for the game.'});
  }
  if(req.body.description == " "){
    errors.push({text: 'Please tell us about the game.'});
  }
  // maybe add a min length for description
  if(errors.length > 0){
    console.log(errors);
    res.render('games/add', {
      errors: errors,
      title: req.body.title,
      address: req.body.address,
      zip: req.body.zip,
      locationType: req.body.locationType,
      numberOfPlayers: req.body.number,
      startTime: req.body.startTime,
      date: req.body.date,
      experience: req.body.experience,
      description: req.body.description,
      host: req.user.id

    });

  } else {


  const newGame = {
  title: req.body.title,
  address: req.body.address,
  zip: req.body.zip,
  locationType: req.body.locationType,
  numberOfPlayers: req.body.number,
  startTime: req.body.startTime,
  date: req.body.date,
  experience: req.body.experience,
  description: req.body.description,
  host: req.user.id,
  };

  geocoder.geocode(req.body.address)
    .then(function(response) {
      long = response[0].longitude;
      lat = response[0].latitude;
      new Game(newGame)
      .save()
      .then(game => {
        game.location.coordinates.splice(0,2);
        game.location.coordinates.push(lat,long);
        game.save();
        console.log(game.location.coordinates);
        req.flash('success_msg', 'Game Added!');
        res.redirect(`/games/show/${game.id}`);
      });
  });

  }
});

// get edit game page

router.get('/edit/:id', ensureAuthenticated, (req,res)=>{
  Game.findOne({ _id: req.params.id
  }).then(game=>{
    res.render('games/edit',{
        errors: errors,
        game: game,
      });
    });
});

// do the editing

router.put('/edit/:id', ensureAuthenticated, (req,res)=>{
  Game.findOne({ _id: req.params.id
  }).then(game=>{
    if(!req.body.title){
      errors.push({text: 'Please add a title.'});
    }
    if(!req.body.address){
      errors.push({text: 'Please add an address.'});
    }
    if(!req.body.zip){
      errors.push({text: 'Please add a zip code.'});
    }
    if(!req.body.number){
      errors.push({text: 'Please select a number of players for the game.'});
    }
    if(req.body.description == " "){
      errors.push({text: 'Please tell us about the game.'});
    }
    // maybe add a min length for description
    if(errors.length > 0){
      console.log(errors);
      res.render('games/edit/:id', {
        errors: errors,
        title: req.body.title,
        address: req.body.address,
        zip: req.body.zip,
        locationType: req.body.locationType,
        numberOfPlayers: req.body.number,
        startTime: req.body.startTime,
        date: req.body.date,
        experience: req.body.experience,
        description: req.body.description,
        host: req.user.id

      });

    } else {


    game.title = req.body.title;
    game.address = req.body.address;
    game.zip = req.body.zip;
    game.locationType = req.body.locationType;
    game.numberOfPlayers = req.body.number;
    game.startTime = req.body.startTime;
    game.date = req.body.date;
    game.experience = req.body.experience;
    game.description = req.body.description;

    game.save()
    .then(game => {
      req.flash('success_msg', 'Game Updated!');
      res.redirect(`/games/show/${game.id}`);
    });
    }
  });

});


//add player to game
router.post('/player/:id', ensureAuthenticated, (req, res)=>{
  Game.findOne({
    _id:req.params.id
  })
  .then(game => {

    if(req.user.id == game.host) {
        req.flash('error_msg', 'Hosts cannot be players');
        res.redirect('/games');
      }

    else if(game.players.length > 0){
      game.players.forEach(function(player){
        if(player.playerUser == req.user.id ){
            req.flash('error_msg', 'Already Registed!');
            res.redirect('/games');
        } else {

          const newPlayer = {
            playerUser: req.user.id
          };

          game.players.unshift(newPlayer);
          game.numberOfPlayers -= 1;
          game.save()
          .then(game =>{
            req.flash('success_msg', 'Signed up for game!');
            res.redirect('/users/dashboard');
          });
        }
      });
    } else {
      //dry up later
      const newPlayer = {
        playerUser: req.user.id
      };
      game.players.unshift(newPlayer);
      game.numberOfPlayers -= 1;

      game.save()
      .then(game =>{
        req.flash('success_msg', 'Signed up for game!');

        res.redirect('/users/dashboard');
      });
    }
    });
});




router.post('/host_review/:id', ensureAuthenticated, (req, res)=>{


  Game.findOne({
    _id: req.params.id
  })
  .populate('host')
  .then(game=> {
    game.host.hostReviews.forEach(function(review){
      if (review.game == game.id && review.reviewUser == req.user.id){
          req.flash('error_msg', 'You already added a review!');
          res.redirect('/');
      } else {

        const newHostReview = {
        game: game.id,
        reviewBody: req.body.hostReviewBody,
        reviewScore: req.body.hostReviewScore,
        reviewUser: req.user.id
      };
      //works probably need to clean it up though
      game.host.hostReviews.unshift(newHostReview);
      const newAverage = ratingsAverage(game.host,'host');
      game.host.hostReviewAverage = newAverage;
      game.host.save()
      .then(game=> {
        req.flash('success_msg', 'Review added!');
        res.redirect('/');
      });
    }
  });
  });
});




router.post('/player_review/:id', ensureAuthenticated, (req, res)=>{


  User.findOne({
    _id: req.body.player_id
  })
  .then(user=>{
    if(user.playerReviews.find(function(review){
         return review.game == req.params.id && review.reviewUser == req.user.id;
      })){
        req.flash('error_msg', 'You already added a review!');
        res.redirect('/');
      } else {

    const newPlayerReview = {
      game: req.params.id,
      reviewBody: req.body.playerReviewBody,
      reviewScore: req.body.playerReviewScore,
      reviewUser: req.user.id
    };
    user.playerReviews.unshift(newPlayerReview);
    const newAverage = ratingsAverage(user,'player');
    user.playerReviewAverage = newAverage;
    user.save()
    .then(user=>{
      req.flash('success_msg', 'Review added!');
      res.redirect('/');
    });
  }
  });
});




// remove game
router.delete('/:id', ensureAuthenticated, (req,res) => {
  Game.remove({_id: req.params.id})
    .then(()=> {
      req.flash('success_msg', 'Game Removed!');
      res.redirect('/users/dashboard');
    });
});



module.exports = router;
