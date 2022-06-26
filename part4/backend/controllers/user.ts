import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '../models/user'
const userRouter: Router = require('express').Router()

userRouter.post(
  '/',
  async ({ body: { username, name, password } }, response) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
)

userRouter.get('/:id', async (request, response, next) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.status(201).json(user)
  } else {
    response.status(404).end()
  }
})

export default userRouter
