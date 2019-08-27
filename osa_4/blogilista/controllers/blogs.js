const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .populate('user', '-blogs')
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response, next) => {

  try {
    const decodedToken = jwt.verify(request.token, config.SECRET)

    if (!decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken)

    const attributes = request.body
    attributes.user = user.id
    const blog = new Blog(attributes)
    const savedBlog = await blog.save()
    user.blogs.push(savedBlog.id)
    await user.save()
    const returnBlog = {
      title: savedBlog.title,
      author: savedBlog.author,
      url: savedBlog.url,
      likes: savedBlog.likes,
      id: savedBlog.id,
      user: {
        username: user.username,
        name: user.name
      }
    }
    response.status(201).json(returnBlog)
  } catch(error) {
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