import { Request, Response, Application, NextFunction } from 'express'
import config from './utils/config'
import express from 'express'
const app: Application = express()
import blogRouter from './controllers/blog'
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from './utils/middleware'
import { info, logError } from './utils/logger'

const mongoose = require('mongoose')
mongoose
  .connect(config.MONGODB_URI)
  .then(() => info('Connected to DB'))
  .catch((err: Error) => logError('error connecting to DB:', err))

import cors from 'cors'

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/blog', blogRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
export default app
