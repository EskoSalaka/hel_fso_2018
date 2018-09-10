const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
});

module.exports = Blog;
