var mongoose = require('mongoose');
var adminSchema   = new mongoose.Schema({
  username: String,
  password: String
},
{ collection: 'admin' });
module.exports = mongoose.model('admin',adminSchema);
