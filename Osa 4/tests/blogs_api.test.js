const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
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

beforeAll(async () => {
  await Blog.remove({});
  console.log('cleared');

  const blogs = initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogs.map(blog => blog.save());
  await Promise.all(promiseArray);
  console.log('done');
});

console.log('testing');
describe('testing GET', () => {
  test('blogs are returned as json and get returns code 200', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are 3 blogs in the test database', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(3);
  });

  test('the last blog in called "Test post 3"', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.slice(-1)[0].title).toBe('Test post 3');
  });
});

describe('testing POST', () => {
  test('blogs are returned as json and get returns code 200', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are 3 blogs in the test database', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(3);
  });

  test('the last blog in called "Test post 3"', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.slice(-1)[0].title).toBe('Test post 3');
  });
});

afterAll(() => {
  server.close();
});
