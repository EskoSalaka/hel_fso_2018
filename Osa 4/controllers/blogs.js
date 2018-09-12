const Blog = require('../models/blog');
const User = require('../models/user');
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    _id: 1
  });
  response.json(blogs.map(Blog.format));
});

blogsRouter.post('/', async (request, response) => {
  try {
    let token;
    let decodedToken;

    const body = request.body;
    const auth = request.get('authorization');

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      token = auth.substring(7);
      decodedToken = jwt.verify(token, process.env.SECRET);
    }
    console.log(token, decodedToken);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'content missing' });
    }

    const verifiedUser = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: verifiedUser._id
    });

    const savedBlog = await blog.save();
    verifiedUser.blogs = verifiedUser.blogs.concat(savedBlog._id);
    await verifiedUser.save();

    response.status(200).json(savedBlog);
  } catch (exception) {
    response.status(500).json({ error: String(exception) });
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'malformatted id' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body;
    let blog = {};

    if (body.title !== undefined) {
      blog.title = body.title;
    }

    if (body.author !== undefined) {
      blog.author = body.author;
    }

    if (body.url !== undefined) {
      blog.url = body.url;
    }

    if (body.likes !== undefined) {
      blog.likes = body.likes;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    });

    response.status(200).json(updatedBlog);
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'malformatted id' });
  }
});

module.exports = blogsRouter;
