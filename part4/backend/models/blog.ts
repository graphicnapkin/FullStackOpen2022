const mongoose = require('mongoose')
//import { Model } from 'mongoose'

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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (_: any, returnedObject: { id: string; _id: any; __v: any }) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const BlogModel = mongoose.model('Blog', blogSchema)
export default BlogModel
