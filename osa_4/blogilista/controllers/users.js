const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  response.json(await User.find())
})

usersRouter.post('/', async (request, response, next) => {
  const saltRounds = 10
  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash: await bcrypt.hash(request.body.password, saltRounds),
    notes: []
  })

  try {
    response.json(await user.save())
  } catch(error) {
    next(error)
  }
})

module.exports = usersRouter