const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response, next) => {

  const token = getToken(request)

  try {
    const decodedToken = jwt.verify(token, config.SECRET)

    if (!decodedToken) {
      console.log(decodedToken)
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken)

    const attributes = request.body
    attributes.user = user.id
    const blog = new Blog(attributes)

    const savedBlog = await blog.save()
    user.blogs.push(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch(error) {
    console.log(error.message)
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.status(200).json(updatedBlog)
  } catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).send()
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter