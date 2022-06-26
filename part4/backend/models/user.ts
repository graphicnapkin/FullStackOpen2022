const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  //@ts-ignore
  transform: (_, updatedDoc) => {
    updatedDoc.id = updatedDoc._id.toString()
    delete updatedDoc._id
    delete updatedDoc.__v
    delete updatedDoc.passwordHash
  },
})

const UserModel = mongoose.model('User', userSchema)
export default UserModel
