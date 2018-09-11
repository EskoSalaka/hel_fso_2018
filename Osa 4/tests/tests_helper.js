const Blog = require('../models/blog');
const User = require('../models/user');

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

const initialUsers = [
  {
    username: 'Test User1',
    name: 'Erkki1',
    adult: 'false',
    password: 'asdf1234'
  },
  {
    username: 'Test User2',
    name: 'Erkki2',
    adult: 'false',
    password: 'asdf1234'
  },
  {
    username: 'Test User3',
    name: 'Erkki3',
    adult: 'true',
    password: 'asdf1234'
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

const getBlogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

const getFormattedBlogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(format);
};

const getFormattedUsersInDb = async () => {
  const users = await User.find({});
  return users.map(User.format);
};

module.exports = {
  initialBlogs,
  format,
  getBlogsInDb,
  getFormattedBlogsInDb,
  getFormattedUsersInDb,
  initialUsers
};
