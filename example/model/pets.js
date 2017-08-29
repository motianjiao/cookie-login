var mongoose = require('mongoose');
var PetSchema = new mongoose.Schema({
  name: String,
  age: Number,
  type: {
    type: String,
    enum: ['cat', 'dog']
  },
  breed: String,
  weight: Number,
  uid: String
})

module.exports = mongoose.model('Pet', PetSchema);
