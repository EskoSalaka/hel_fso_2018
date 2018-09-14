const Blog = require('../models/blog');
const User = require('../models/user');
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

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
    const body = request.body;

    if (!request.token) {
      return response
        .status(401)
        .json({ error: 'Unauthorized: token missing or invalid' });
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'Unauthorized: token missing or invalid' });
    }

    if (
      body.title === undefined ||
      body.title.length === 0 ||
      body.url === undefined ||
      body.url.length === 0
    ) {
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
    console.log(request.token);

    if (!request.token) {
      return response
        .status(401)
        .json({ error: 'Unauthorized: token missing or invalid' });
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'Unauthorized: token missing or invalid' });
    }

    const verifiedUser = await User.findById(decodedToken.id);
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      response.status(204).end();
    }

    if (blog.user._id.toString() === verifiedUser._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response
        .status(403)
        .json({ error: 'Unauthorized: users can only delete their own posts' });
    }
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: String(exception) });
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
