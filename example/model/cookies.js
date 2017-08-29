var mongoose = require('mongoose');
var cookieSchema = new mongoose.Schema({
  uid: { type: String, unique: true },
  series: { type: String, unique: true },
  token: String,
  expire: { type: Date, Default: Date.now}
})

module.exports = mongoose.model('Cookie', cookieSchema);
