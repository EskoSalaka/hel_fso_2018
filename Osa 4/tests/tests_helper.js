const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Test post 1',
    author: 'Esko1',
    url: 'www.microsoft1.com',
    likes: 1
  },
  {
    title: 'Test post 2',
    author: 'Esko2',
    url: 'www.microsoft2.com',
    likes: 2
  },
  {
    title: 'Test post 3',
    author: 'Esko3',
    url: 'www.microsoft3.com',
    likes: 3
  }
];

const format = blog => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  };
};

const getFormattedBlogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(format);
};

module.exports = {
  initialBlogs,
  format,
  getFormattedBlogsInDb
};