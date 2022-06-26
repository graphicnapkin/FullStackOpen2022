import { Router, Request } from 'express'
import jwt from 'jsonwebtoken'
import Blog from '../models/blog'
import User from '../models/user'
const blogRouter: Router = require('express').Router()

blogRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response, next) => {
  const blogObject = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token as string, process.env.SECRET as string)
  if (typeof decodedToken == 'string' || !decodedToken?.id)
    return response.status(401).json({ error: 'token missing or invalid' })

  const user = await User.findById(decodedToken.id)

  blogObject.user = user._id
  if (!blogObject.likes) blogObject.likes = 0

  const blog = new Blog(blogObject)
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  const blog = {
    title,
    author,
    url,
    likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

const getTokenFrom = (request: Request) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7)
  }
  return null
}

export interface BlogInterface {
  title: string
  author: string
  url: string | undefined
  likes: number
}

export default blogRouter
