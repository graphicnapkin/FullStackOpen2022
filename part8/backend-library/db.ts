import mongoose from 'mongoose'

mongoose
  .connect(process.env.MONGODB_URI || '', {
    //@ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))
