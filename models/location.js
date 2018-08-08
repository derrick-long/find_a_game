const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema ({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
  },
  coordinates: {
    type: [Number],
    default: [0,0],
    required: true
  }

});

LocationSchema.index({
  coordinates: "2d"
});

mongoose.model('locations', LocationSchema, 'locations');
