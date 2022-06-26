const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../dist/app')
const api = supertest(app)
const User = mongoose.models.User
const { usersInDb } = require('./test_helper')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    try {
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
      await user.save()
    } catch (err) {
      console.log(err)
    }
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    try {
      await api
        .post('/api/user')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    } catch (err) {
      console.log(err)
    }
  })
})
