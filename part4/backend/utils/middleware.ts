import jwt from 'jsonwebtoken'
import User from '../models/blog'
import { logError, info } from './logger'
import { Request, Response, NextFunction } from 'express'

export const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  info('Method:', request.method)
  info('Path:  ', request.path)
  info('Body:  ', request.body)
  info('---')
  next()
}

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logError(error.message)
  //  console.log('name ', error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

export const tokenExtractor = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.body.token = auth.substring(7)
  }
  next()
}

export const userExtractor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let decodedToken
  let token = ''
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    token = auth.substring(7)
  }
  if (token) {
    decodedToken = jwt.verify(token as string, process.env.SECRET as string)
    if (typeof decodedToken == 'string' || !decodedToken?.id)
      return response.status(401).json({ error: 'token missing or invalid' })

    if (decodedToken?.id) {
      request.body.user = decodedToken.id.toString()
    }
  }

  next()
}

export const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
