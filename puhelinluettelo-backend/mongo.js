const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

console.log(process.argv)

const password = process.argv[2]

if (!password) return console.log("anna salasana")

const url = `mongodb+srv://puhelinluettelo:${password}@full-stack-zuc3z.mongodb.net/mongo?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const Contact = mongoose.model("Contact", contactSchema)

if (process.argv[3] && process.argv[4]) {
  const contact = new Contact({
    name: process.argv[3], 
    number: process.argv[4]
  })
  contact.save().then(result => {
    console.log(`lisätään ${result.name} numero ${result.number} luetteloon`)
    mongoose.connection.close()
  })
} else {
  Contact.find({}).then(result => {
    console.log("puhelinluettelo:")
    result.forEach(one => console.log(`${one.name} ${one.number}`))
    mongoose.connection.close()
  })
}