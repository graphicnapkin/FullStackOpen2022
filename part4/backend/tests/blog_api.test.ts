const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../dist/app')
const api = supertest(app)
const Blog = mongoose.models.Blog
const User = mongoose.models.User

let token = ''
const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

beforeEach(async () => {
  const user = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
  token = `Bearer ${user.body.token}`

  const blogUser = await User.findOne({ username: 'root' })

  await Blog.deleteMany({})
  const blogPromises = initialBlogs
    .map((blog) => new Blog({ ...blog, user: blogUser._id }))
    .map((blog) => blog.save())
  await Promise.all(blogPromises)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set('Authorization', token)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs').set('Authorization', token)
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a valid blog can be added', async () => {
  const user = await User.findOne({ username: 'root' })
  const userId = user._id.toString()

  const newBlog = {
    title: 'Test new blog',
    author: 'Jon Carter',
    url: 'https://graphicnapkin.com',
    likes: 1000,
    userId: userId,
    __v: 0,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
})

test('a blog without an author is not added', async () => {
  const user = await User.findOne({ username: 'root' })
  const userId = user._id.toString()

  const newBlog = {
    title: 'No Author',
    url: 'https://noauthor.com',
    likes: 0,
    userId,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogs = await blogsInDb()
  const blogToDelete = blogs[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', token)
    .expect(204)

  const blogsAtEnd = await blogsInDb()

  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
  expect(blogsAtEnd.map((r) => r.title)).not.toContain(blogToDelete.title)
})

test('a blog created without passing likes is defaulted to 0', async () => {
  const user = await User.findOne({ username: 'root' })
  const userId = user._id.toString()

  const newBlog = {
    author: 'No Likes',
    title: 'No Likes',
    url: 'https://nolikes.com',
    userId,
  }
  const response = await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
  expect(response.body.likes).toEqual(0)
})

test("a blog's likes can be update", async () => {
  const blogs = await blogsInDb()
  const updatedBlog = blogs[0]
  updatedBlog.likes++

  const response = await api
    .put(`/api/blogs/${updatedBlog.id}`)
    .set('Authorization', token)
    .send(updatedBlog)

  expect(response.body.likes).toEqual(updatedBlog.likes)
})

afterAll(() => mongoose.connection.close())
