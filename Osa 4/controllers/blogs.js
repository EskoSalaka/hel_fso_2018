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
      console.log(111, request.body, 111);
      return response.status(400).json({ error: 'content missing' });
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
    });

    const savedBlog = await blog.save();
    response.status(200).json(blog);
  } catch (exception) {
    response.status(500).json({ error: 'something went wrong...' });
  }
});

module.exports = blogsRouter;
