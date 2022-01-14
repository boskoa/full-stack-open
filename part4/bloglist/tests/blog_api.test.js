const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 20000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 20000)

test('identifier property is named \'id\'', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
}, 20000)

test('a new blog post is successfully created', async () => {
  const newPost = {
    title: 'Example blog post',
    author: 'John Doe',
    url: 'example.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter.length).toBe(helper.initialBlogs.length + 1)

  const titles = blogsAfter.map(b => b.title)
  expect(titles).toContain(newPost.title)
}, 20000)

test('new blog post has default >likes< value of 0', async () => {
  const newPost = {
    title: 'Example blog post without likes',
    author: 'John Doe',
    url: 'example.com',
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()
  const addedPost = blogsAfter.filter(b => b.title === newPost.title)[0]
  expect(addedPost.likes).toBe(0)
}, 20000)

test('post request without title or url are not allowed', async () => {
  const newPost = {
    url: 'example.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})