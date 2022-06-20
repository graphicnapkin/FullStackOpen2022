const mongoose = require('mongoose')
import { Model } from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  author: {
    type: String,
    required: true,
    minlength: 1,
  },
  url: {
    type: String,
    minlength: 4,
  },
  likes: Number,
})

const BlogModel: Model<{
  title: string
  author: string
  url: string | undefined
  likes: number | undefined
}> = mongoose.model('Blog', blogSchema)

export default BlogModel
