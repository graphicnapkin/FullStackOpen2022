import { Router } from 'express'
import Blog from '../models/blog'
const blogRouter: Router = require('express').Router()

blogRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({})
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
  if (!blogObject.likes) blogObject.likes = 0
  const blog = new Blog(blogObject)
  const result = await blog.save()
  response.status(201).json(result)
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

export interface BlogInterface {
  title: string
  author: string
  url: string | undefined
  likes: number
}

export default blogRouter
