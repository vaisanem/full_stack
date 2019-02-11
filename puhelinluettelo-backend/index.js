const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const Contact = require("./models/contact")

app.use(express.static("build"))
app.use(cors())
app.use(bodyParser.json())

morgan.token("body", (req) => {
  const body = JSON.stringify(req.body)

  if (body.length === 2) return ""
  return body
})

app.use(morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
))

app.get("/info", (req, res, next) => {
  Contact.countDocuments({}).then(count => {
    res.send(
      "<div>"
        + `<p> Puhelinluettelossa ${count} henkilön tiedot </p>`
        + `<p> ${Date()} </p>`
        + "</div>"
    )
  }, error => next(error))
})

app.get("/api/contacts", (req, res, next) => {
  Contact.find({}).then(
    contacts => res.json(contacts),
    error => next(error)
  )
})

app.get("/api/contacts/:id", (req, res, next) => {
  Contact.findById(req.params.id).then(
    contact => {
      if (contact) res.json(contact)
      else res.status(404).end()
    }, error => next(error)
  )
})

app.post("/api/contacts", (req, res, next) => {

  const contact = new Contact({
    name: req.body.name,
    number: req.body.number
  })

  contact.save().then(
    contact => res.status(201).json(contact),
    error => next(error)
  )
})

app.put("/api/contacts/:id", (req, res, next) => {
  const contact = {
    name: req.body.name,
    number: req.body.number
  }
  Contact
    .findByIdAndUpdate(req.params.id, contact, { new: true }, { runValidators: true, context: "query" })
    .then(
      contact => res.json(contact),
      error => next(error)
    )
})

app.delete("/api/contacts/:id", (req, res, next) => {
  Contact
    .findByIdAndRemove(req.params.id)
    .then(
      () => res.status(204).end(),
      (error) => next(error)
    )
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)