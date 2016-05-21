var mongoose = require('mongoose');
var postSchema   = new mongoose.Schema({
  id: Number,
  title: String,
  body: String
},
{ collection: 'posts' }
);
module.exports = mongoose.model('posts',postSchema);