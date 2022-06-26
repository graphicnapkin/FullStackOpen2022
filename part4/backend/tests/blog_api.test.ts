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
  const blogPromises = initialBlogs
    .map((blog) => new Blog(blog))
    .map((blog) => blog.save())
  await Promise.all(blogPromises)
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
  await api.delete(`/api/blog/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await blogsInDb()

  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
  expect(blogsAtEnd.map((r) => r.title)).not.toContain(blogToDelete.title)
})

test('a blog created without passing likes is defaulted to 0', async () => {
  const newBlog = {
    author: 'No Likes',
    title: 'No Likes',
    url: 'https://nolikes.com',
  }
  const response = await api.post('/api/blog').send(newBlog)
  expect(response.body.likes).toEqual(0)
})

test("a blog's likes can be update", async () => {
  const blogs = await blogsInDb()
  const updatedBlog = blogs[0]
  updatedBlog.likes++

  const response = await api
    .put(`/api/blog/${updatedBlog.id}`)
    .send(updatedBlog)

  expect(response.body.likes).toEqual(updatedBlog.likes)
})

afterAll(() => mongoose.connection.close())
