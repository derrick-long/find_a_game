const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Game Schema
// time
// date
// type
//




const GameSchema = new Schema ({
  title: {
  type: String,
  required: true
  },
  address: {
  type: String,
  required: true
  },
  zip: {
    type: String,
    required: true
  },
  locationType: {
    type: String,
    required: true
  },
  numberOfPlayers: {
    type: String,
  },
  experience: {
    type: String,
  },
  description: {
    type: String,
    required: true
  }


});

mongoose.model('games', GameSchema, 'games');
