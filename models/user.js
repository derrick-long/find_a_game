const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
// save player reviews  with number

const UserSchema = new Schema({
  googleID: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type: String
  },
  hostReviews: [{
    game: {
      type: Schema.Types.ObjectId,
      ref: 'games'
    },
    reviewBody:{
      type: String,
      required: true
    },
    reviewDate: {
      type: Date,
      default: Date.now
    },
    reviewScore:{
      type: Number,
      required: true
    },
    reviewUser: {
      type: Schema.Types.ObjectId,
      ref:'users'
    }
  }],
  hostReviewAverage: {
      type: Number,
      default: 0
  },
  playerReviews: [{
    game: {
      type: Schema.Types.ObjectId,
      ref: 'games'
    },
    reviewBody:{
      type: String,
      required: true
    },
    reviewDate: {
      type: Date,
      default: Date.now
    },
    reviewScore:{
      type: Number,
      required: true
    },
    reviewUser: {
      type: Schema.Types.ObjectId,
      ref:'users'
    }
  }],
  playerReviewAverage: {
    type: Number,
    default: 0
  },
  profileInfo: [{
    description: {
      type: String,
      defalt: "Add a custom profile!"
    },
    favoriteGame: {
      type: String
    }
  }]


});


//Create collection and add schema
mongoose.model('users', UserSchema);
