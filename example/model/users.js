var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  email: {type: String, unique: true},
  password: String,
  fullname: String,
  avatar: String,
  phoneNumber: String,
  gender: String
});


module.exports = mongoose.model('User', UserSchema);
