const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema ({

  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
  },
  coordinates: {
    type: [Number],
    default: [0,0],
    required: true
  }

});
