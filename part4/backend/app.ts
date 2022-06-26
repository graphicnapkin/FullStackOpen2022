import { Request, Response, Application, NextFunction } from 'express'
import config from './utils/config'
import express from 'express'
require('express-async-errors')
const app: Application = express()
import blogRouter from './controllers/blog'
import userRouter from './controllers/user'
import loginRouter from './controllers/login'

import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from './utils/middleware'
import { info, logError } from './utils/logger'
import cors from 'cors'
const mongoose = require('mongoose')

const main = async () => {
  try {
    mongoose.connect(config.MONGODB_URI)
    info('Connected to DB')
  } catch (err) {
    logError('error connecting to DB:', err)
  }
  app.use(cors())
  app.use(express.static('build'))
  app.use(express.json())
  app.use(requestLogger)

  app.use('/api/blogs', blogRouter)
  app.use('/api/users', userRouter)
  app.use('/api/login', loginRouter)
  app.use(errorHandler)
  app.use(unknownEndpoint)
}

main()

module.exports = app
export default app
