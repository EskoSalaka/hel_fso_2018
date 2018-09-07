const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mongoUrl = process.env.MONGODB_URI;
console.log(mongoUrl);

mongoose.connect(mongoUrl);

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
});

module.exports = Blog;
