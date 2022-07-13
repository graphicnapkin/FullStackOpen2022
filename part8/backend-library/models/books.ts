import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: String,
  published: Number,
  author: String,
  //  author: {
  //    type: mongoose.Schema.Types.ObjectId,
  //    ref: 'Book',
  //  },
  genres: {
    type: [String],
    minlength: 1,
  },
})

export default mongoose.model('Book', schema)
