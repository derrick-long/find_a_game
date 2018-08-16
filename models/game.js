const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//add validations



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
    type: Number,
    min: 0
  },
  experience: {
    type: String,
  },
  description: {
    type: String,
    required: true
  },
  startTime: {
    type: String
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  location: {
    type: { type: String,
    enum: ['Point'],
    default: 'Point'},
    coordinates: []
  },
  date: {
    type: Date
  },
  datePosted: {
  type: Date,
  default: Date.now
  },
  players: [{
    playerUser: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    }
  }]


});

GameSchema.index({ location: "2dsphere"});



mongoose.model('games', GameSchema, 'games');
