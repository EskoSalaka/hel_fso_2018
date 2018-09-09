const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);

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

afterAll(() => {
  server.close();
});
