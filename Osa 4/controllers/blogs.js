const Blog = require('../models/blog');
const blogsRouter = require('express').Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body;
    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'content missing' });
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
    });

    const savedBlog = await blog.save();
    response.status(200).json(savedBlog);
  } catch (exception) {
    response.status(500).json({ error: 'something went wrong...' });
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
