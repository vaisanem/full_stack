const express = require("express")
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

let contacts = [
  {
    id: 1,
    name: "Hyvä ystävä",
    number: "040-2364782"
  },
  {
    id: 2,
    name: "Toinen ystävä",
    number: "040-3364782"
  },
  {
    id: 3,
    name: "Ystävä Hyvä",
    number: "040-2364783"
  }
]

const numberExists = (number) => {
  return contacts.find(
    one => one.number === number
  )
}

app.get("/info", (req, res) => {
  res.send( 
    '<div>'
      + `<p> Puhelinluettelossa ${contacts.length} henkilön tiedot </p>`
      + `<p> ${Date()} </p>`
      + '</div>' 
  )
})

app.get("/api/contacts", (req, res) => {
  res.json(contacts)
})

app.get("/api/contacts/:id", (req, res) => {
  const id = Number(req.params.id)
  found = contacts.find(one => one.id === id)
  if (found) {
    res.json(found)
  } else {
    res.status(404).end()
  }
})

app.post("/api/contacts", (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: "Name and number must be provided."
    })
  }
  if (numberExists(req.body.number)) {
    return res.status(409).json({
      error: "Number is already registered."
    })
  }

  const contact = {
    id: Math.ceil(Math.random() * 1000),
    name: req.body.name,
    number: req.body.number
  }
  contacts.push(contact)
  res.status(201).send(contact)
})

app.delete("/api/contacts/:id", (req, res) => {
  const id = Number(req.params.id)
  contacts = contacts.filter(one => one.id !== id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT)