const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);

test('blogs are returned as json and get returns code 200', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

afterAll(() => {
  server.close();
});
