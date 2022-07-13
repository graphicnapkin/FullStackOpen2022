import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  //  books: {
  //    type: [mongoose.Schema.Types.ObjectId],
  //    ref: 'Book',
  //  },
  //  bookCount: Number,
  name: String,
  born: Number,
})

export default mongoose.model('Author', schema)
