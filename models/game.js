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
  required: true}
});

mongoose.model('games', GameSchema);
