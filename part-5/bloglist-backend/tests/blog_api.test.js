const { test, after, beforeEach, describe } = require('node:test');
const Blog = require('../models/blog');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const assert = require('node:assert');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, 2);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs');

  const contents = response.body.map((e) => e.title);
  assert.strictEqual(contents.includes('test env first blog'), true);
});

test('blogs have a unique id property', async () => {
  const response = await api.get('/api/blogs');

  const ids = new Set(response.body.map((e) => e.id));
  assert.strictEqual(ids.size, response.body.length);
});

test('a valid blog can be added', async () => {
  const user = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' });
  const newBlog = {
    title: 'test env third blog',
    author: 'Blibli',
    url: 'test env third URL',
    likes: 3,
    user: user.id,
  };
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${user.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
});

test('default value for likes is 0 if likes is missing', async () => {
  const newBlog = {
    title: 'test env likeless blog',
    author: 'Bloblo',
    url: 'test env likeless URL',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const newBlogInDb = await helper.blogsInDb();
  assert.strictEqual(newBlogInDb[2].likes, 0);
});

describe('missing ', async () => {
  test('URL returns an error', async () => {
    const newBlog = {
      title: 'test env third blog',
      author: 'Blibli',
      likes: 3,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  test('title returns an error', async () => {
    const newBlog = {
      author: 'Blibli',
      url: 'test env likeless URL',
      likes: 3,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });
});

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  const titles = blogsAtEnd.map((b) => b.title);

  assert(!titles.includes(blogToDelete.title));
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
});

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  console.log('blogs to update ', blogToUpdate);

  const newLikes = { likes: 4 };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(newLikes);

  const blogsAtEnd = await helper.blogsInDb();
  console.log('blogs at end ', blogsAtEnd);
  const [updatedBlog] = blogsAtEnd.filter(
    (blog) => blog.id === blogToUpdate.id
  );
  console.log('updated blog ', updatedBlog);
  assert.strictEqual(updatedBlog.likes, newLikes.likes);
});

after(async () => {
  await mongoose.connection.close();
});
