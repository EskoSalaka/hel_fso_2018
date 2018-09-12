const Blog = require('../models/blog');
const User = require('../models/user');
const blogsRouter = require('express').Router();

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
    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'content missing' });
    }

    const users = await User.find({});
    const firstUser = users[0];

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: firstUser._id
    });

    const savedBlog = await blog.save();
    firstUser.blogs = firstUser.blogs.concat(savedBlog._id);
    await firstUser.save();

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
