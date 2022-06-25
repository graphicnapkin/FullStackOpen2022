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
})

blogSchema.set('toJSON', {
  transform: (_: any, returnedObject: { id: string; _id: any; __v: any }) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
//const BlogModel: Model<{
//title: string
// author: string
// url: string | undefined
// likes: number | undefined
//}>
const BlogModel = mongoose.model('Blog', blogSchema)
//module.exports = { BlogModel, default: BlogModel }
export default BlogModel
