const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

const {
  initialBlogs,
  initialUsers,
  format,
  getFormattedBlogsInDb,
  getFormattedUsersInDb
} = require('./tests_helper');

describe('testing API with initial data', async () => {
  beforeAll(async () => {
    console.log('BEF');
    await Blog.remove({});

    const newBlogs = initialBlogs.map(blog => new Blog(blog));
    await Promise.all(newBlogs.map(blog => blog.save()));

    await User.remove({});

    const newUsers = initialUsers.map(user => new User(user));
    await Promise.all(newUsers.map(user => user.save()));
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

      const blogsBeforePost = await getFormattedBlogsInDb();

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

  describe('testing PUT with a database which has initial blogs', async () => {
    let blogForPUT;

    beforeAll(async () => {
      blogForPUT = new Blog({
        title: 'Test post PUT',
        author: 'Esko PUT',
        url: 'www.microsoftPOST.com PUT',
        likes: 1000
      });

      await blogForPUT.save();
    });

    test('modifying a blog found in the database should return 200 and modify it', async () => {
      const blogsBeforePUT = await getFormattedBlogsInDb();

      const blogModified = {
        title: 'Test post PUT MOD',
        author: 'Esko PUT MOD',
        url: 'www.microsoftPOST.com PUT MOD',
        likes: 1001
      };

      const response = await api
        .put(`/api/blogs/${blogForPUT._id}`)
        .send(blogModified)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(format(response.body)).toEqual(blogModified);

      const blogsAfterPUT = await getFormattedBlogsInDb();
      expect(blogsAfterPUT.length).toBe(blogsBeforePUT.length);
      expect(blogsAfterPUT).toContainEqual(blogModified);
    });

    test('partly modifying a blog found in the database should return 200 and modify it', async () => {
      const blogsBeforePUT = await getFormattedBlogsInDb();

      const blogModified = {
        likes: 10022
      };

      const response = await api
        .put(`/api/blogs/${blogForPUT._id}`)
        .send(blogModified)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body.likes).toBe(blogModified.likes);

      const blogsAfterPUT = await getFormattedBlogsInDb();
      expect(blogsAfterPUT.length).toBe(blogsBeforePUT.length);
      const bb = await Blog.findOne({ _id: blogForPUT._id });
      expect(bb.likes).toBe(blogModified.likes);
    });
  });

  describe('testing adding Users', async () => {
    test('adding a valid user should return 200 and add the user in the db', async () => {
      const usersBeforePost = await getFormattedUsersInDb();

      const newUser = {
        username: 'Test User TEST1',
        name: 'Erkki TEST1',
        adult: 'true',
        password: 'asdf1234'
      };

      const response = await api
        .post('/api/users/')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body.username).toEqual(newUser.username);

      const usersAfterPost = await getFormattedUsersInDb();
      expect(usersAfterPost.length).toBe(usersBeforePost.length + 1);
      expect(JSON.stringify(usersAfterPost)).toContain(
        JSON.stringify(response.body)
      );
    });

    test('adding a user without specifying "adult" should return 200 and add the user in the db with "adult" true', async () => {
      const usersBeforePost = await getFormattedUsersInDb();

      const newUser = {
        username: 'Test User TEST2',
        name: 'Erkki TEST2',
        password: 'asdf1234'
      };

      const response = await api
        .post('/api/users/')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body.adult).toEqual(true);

      const usersAfterPost = await getFormattedUsersInDb();
      expect(usersAfterPost.length).toBe(usersBeforePost.length + 1);
      expect(JSON.stringify(usersAfterPost)).toContain(
        JSON.stringify(response.body)
      );
    });

    test('adding users with password length < 3 fails', async () => {
      const usersBeforePost = await getFormattedUsersInDb();

      const newUser = {
        username: 'Test User TEST3',
        name: 'Erkki TEST3',
        password: 'as'
      };

      const response = await api
        .post('/api/users/')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('adding users with taken "username" fails', async () => {
      const usersBeforePost = await getFormattedUsersInDb();

      const newUser = {
        username: 'Test User1',
        name: 'Erkki1',
        password: 'asdf1234'
      };

      const response = await api
        .post('/api/users/')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });
  });

  afterAll(() => {
    server.close();
  });
});
