import { Router } from 'express'
import Blog from '../models/blog'
const blogRouter: Router = require('express').Router()

blogRouter.get('/', (_, response) => {
  Blog.find({}).then((blogs: any) => {
    response.json(blogs)
  })
})

blogRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog: any) => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch((err: Error) => next(err))
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  blog.save().then((result: BlogInterface[]) => {
    response.status(201).json(result)
  })
})

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog: any) => response.json(updatedBlog))
    .catch((err: Error) => next(err))
})

blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((err: Error) => next(err))
})

export interface BlogInterface {
  title: string
  author: string
  url: string | undefined
  likes: number
}

export default blogRouter
