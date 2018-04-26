const mongoose = require('mongoose');
const Schema = mongoose.Schema;





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
  },
  host: {
  type: Schema.Types.ObjectId,
  ref: 'users'
  },
  datePosted: {
  type: Date,
  default: Date.now
  },
  players: [{
    playerUser: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }]


});

// idea here is basically have the players attribute be an array
// that we add players too, that cannot be larger than the numberOfPlayers
// look at how we saved comments and users associated with them in storybooks
// basically should be able to click it, and it takes you to a page that outputs
// your listed/commited players along with whatever their "star rating is"
//also store player reviews here and only have them doable by players that attended
// the game

mongoose.model('games', GameSchema, 'games');
