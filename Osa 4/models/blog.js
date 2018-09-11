const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
  //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

blogSchema.statics.format = blog => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
    //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  };
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
