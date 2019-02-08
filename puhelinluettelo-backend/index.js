const express = require("express")
const app = express()

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
  found = contacts.find( one => one.id === id)
  if (found) {
    res.json(found)
  } else {
    res.status(404).end()
  }
})

app.delete("/api/contacts/:id", (req, res) => {
  const id = Number(req.params.id)
  contacts = contacts.filter(one => one.id !== id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT)