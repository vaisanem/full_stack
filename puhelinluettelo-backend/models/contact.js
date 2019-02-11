const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

mongoose.set("useFindAndModify", false)

const url = process.env.MONGODB_URI

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log("connected to MongoDB"),
    error => console.log("error connection to MongoDB:", error.message))

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    unique: true,
    minlength: 8
  }
})

contactSchema.set("toJSON", { transform: (doc, ret) => {
  ret.id = ret._id.toString()
  delete ret._id
  delete ret.__v
} })

contactSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Contact", contactSchema)