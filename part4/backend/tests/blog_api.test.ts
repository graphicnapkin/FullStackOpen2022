const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../dist/app')
const api = supertest(app)
const Blog = mongoose.models.Blog
const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

test('notes are returned as json', async () => {
  await api
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let i = 0; i < initialBlogs.length; i++) {
    const blog = new Blog(initialBlogs[i])
    await blog.save()
  }
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blog')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test new blog',
    author: 'Jon Carter',
    url: 'https://graphicnapkin.com',
    likes: 1000,
    __v: 0,
  }
  await api
    .post('/api/blog')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
})

test('a blog without an author is not added', async () => {
  const newBlog = { title: 'No Author', url: 'https://noauthor.com', likes: 0 }
  await api.post('/api/blog').send(newBlog).expect(400)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogs = await blogsInDb()
  const blogToDelete = blogs[0]
  console.log(typeof blogToDelete._id.toString(), blogToDelete._id.toString())
  await api.delete(`/api/blog/${blogToDelete._id.toString()}`).expect(204)

  const blogsAtEnd = await blogsInDb()

  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
  expect(blogsAtEnd.map((r) => r.title)).not.toContain(blogToDelete.title)
})

afterAll(() => mongoose.connection.close())
