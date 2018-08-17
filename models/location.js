const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema ({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'},
    coordinates: [],
    }

});

LocationSchema.index({ location: '2dsphere'});

mongoose.model('locations', LocationSchema, 'locations');
