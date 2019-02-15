const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

module.exports = app
