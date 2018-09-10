const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');
const {
  initialBlogs,
  format,
  getFormattedBlogsInDb
} = require('./tests_helper');

beforeAll(async () => {
  console.log('BEF');
  await Blog.remove({});

  const newBlogs = initialBlogs.map(blog => new Blog(blog));
  await Promise.all(newBlogs.map(blog => blog.save()));
  console.log('DONE');
});

describe('testing GET with database which has initial blogs', async () => {
  test('all initial blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.length).toBe(initialBlogs.length);
    const strResp = response.body.map(format).map(JSON.stringify);

    initialBlogs.forEach(blog => {
      expect(strResp).toContain(JSON.stringify(blog));
    });
  });
});

describe('testing POST with a database which has initial blogs', async () => {
  test('posting valid blog should return 200, posted json object', async () => {
    const newValidBlog = {
      title: 'Test post POST VALID',
      author: 'Esko POST VALID',
      url: 'www.microsoftPOST.com VALID',
      likes: 1
    };

    blogsBeforePost = await getFormattedBlogsInDb();

    const response = await api
      .post('/api/blogs')
      .send(newValidBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(JSON.stringify(format(response.body))).toBe(
      JSON.stringify(newValidBlog)
    );

    const blogsAfterPost = await getFormattedBlogsInDb();
    const stringifiedBlogs = blogsAfterPost.map(JSON.stringify);

    expect(blogsAfterPost.length).toBe(blogsBeforePost.length + 1);
    expect(stringifiedBlogs).toContain(JSON.stringify(newValidBlog));
  });

  test('posting blog with missing title should return 400 and fail', async () => {
    const newInvalidBlog = {
      author: 'Esko POST MISSING TITLE',
      url: 'www.microsoftPOST.com MISSING TITLE',
      likes: 2
    };

    blogsBeforePost = await getFormattedBlogsInDb();

    const response = await api
      .post('/api/blogs')
      .send(newInvalidBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const blogsAfterPost = await getFormattedBlogsInDb();
    expect(blogsAfterPost.length).toBe(blogsBeforePost.length);
  });

  test('posting blog with missing url should return 400 and fail', async () => {
    const newInvalidBlog = {
      title: 'Test post POST MISSING URL',
      author: 'Esko POST MISSING URL',
      likes: 3
    };

    blogsBeforePost = await getFormattedBlogsInDb();

    const response = await api
      .post('/api/blogs')
      .send(newInvalidBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const blogsAfterPost = await getFormattedBlogsInDb();
    expect(blogsAfterPost.length).toBe(blogsBeforePost.length);
  });

  test('posting blog with missing likes should return 200 and set likes to 0', async () => {
    const newValidBlog = {
      title: 'Test post POST MISSING LIKES',
      author: 'Esko POST MISSING LIKES',
      url: 'www.microsoftPOST.com MISSING LIKES'
    };

    blogsBeforePost = await getFormattedBlogsInDb();

    const response = await api
      .post('/api/blogs')
      .send(newValidBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    //////////////////////
    newValidBlog.likes = 0;
    //////////////////////

    expect(JSON.stringify(format(response.body))).toBe(
      JSON.stringify(newValidBlog)
    );

    const blogsAfterPost = await getFormattedBlogsInDb();
    const stringifiedBlogs = blogsAfterPost.map(JSON.stringify);

    expect(blogsAfterPost.length).toBe(blogsBeforePost.length + 1);
    expect(stringifiedBlogs).toContain(JSON.stringify(newValidBlog));
  });
});

describe('testing DELETE with a database which has initial blogs', async () => {
  let blogForDELETE;

  beforeAll(async () => {
    blogForDELETE = new Blog({
      title: 'Test post DELETE',
      author: 'Esko DELETE',
      url: 'www.microsoftPOST.com DELETE',
      likes: 100
    });
    await blogForDELETE.save();
  });

  test('deleting a blog found in the database should return 204 and remove it', async () => {
    blogsBeforeDelete = await getFormattedBlogsInDb();

    await api.delete(`/api/blogs/${blogForDELETE._id}`).expect(204);

    const blogsAfterDelete = await getFormattedBlogsInDb();
    const stringifiedBlogs = blogsAfterDelete.map(JSON.stringify);

    expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length - 1);
    expect(stringifiedBlogs).not.toContain(JSON.stringify(blogForDELETE));
  });
});

afterAll(() => {
  server.close();
});
