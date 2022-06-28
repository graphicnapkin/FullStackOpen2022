import { Router, Request } from 'express'
import jwt from 'jsonwebtoken'
import Blog from '../models/blog'
import User from '../models/user'
const blogRouter: Router = require('express').Router()

blogRouter.get('/', async (request, response) => {
  if (!request.body.token)
    return response.status(401).json({ error: 'token missing or invalid' })
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
  if (!request.body.token)
    return response.status(401).json({ error: 'token missing or invalid' })
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!body.token)
    return response.status(401).json({ error: 'token missing or invalid' })
  const user = await User.findById(body.user)

  if (!body.likes) body.likes = 0

  const blog = new Blog(body)
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response, next) => {
  if (!request.body.token)
    return response.status(401).json({ error: 'token missing or invalid' })
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
  if (!request.body.token)
    return response.status(401).json({ error: 'token missing or invalid' })

  const blog = await Blog.findById(request.params.id)
  if (request.body.user !== blog.user._id.toString()) {
    return response
      .status(401)
      .json({ error: 'user not authorized to delete this blog' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

export interface BlogInterface {
  title: string
  author: string
  url: string | undefined
  likes: number
}

export default blogRouter
