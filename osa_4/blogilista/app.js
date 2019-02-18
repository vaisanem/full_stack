const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)

app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
