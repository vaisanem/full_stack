const { ApolloServer } = require('@apollo/server')
const { gql } = require('graphql-tag')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')

mongoose.set('strictQuery', false)

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int
  }
  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String]!
  }
  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book]!
    allAuthors: [Author]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

/* Array.prototype.filterByAuthor = function(author) {
  return author ? this.filter(one => one.author === author) : this
} */

const filterByAuthor = (books, author) => {
return author ? books.filter(one => one.author === author) : books
}

/* Array.prototype.filterByGenre = function(genre) {
  return genre ? this.filter(one => one.genres.includes(genre)) : this
} */

const filterByGenre = (books, genre) => {
  return genre ? books.filter(one => one.genres.includes(genre)) : books
}

const findAuthor = async (name) => {
  return Author.findOne({ name: name })
}

const resolvers = {
  Query: {
    hello: () => { return "world" },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    /* allBooks: (root, args) => books
      .filterByAuthor(args.author)
      .filterByGenre(args.genre),*/
    /* allBooks: async (root, args) => {
      return filterByGenre(filterByAuthor(async () => Book.find({}), args.author), args.genre) // FIXME: filter on the mongodb side
    },*/
    allBooks: async (root, args) => {
      return args.genre ? args.author ? Book.find({ genres: args.genre }).populate({ path: 'author', match: { name: args.author } }).then(b => b.filter(one => one.author)) : Book.find({ genres: args.genre }).populate('author') : args.author ? Book.find().populate({ path: 'author', match: { name: args.author } }).then(b => b.filter(one => one.author)) : Book.find().populate('author')
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (root) => { // Implement with single query?
      const author = await findAuthor(root.name)
      return Book.countDocuments({ author: author._id })
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await findAuthor(args.author)
      !author ? author = await new Author({ name: args.author, born: null }).save() : null
      const book = new Book({ author: author, title: args.title, published: args.published, genres: args.genres })
      return book.save()
    },
    editAuthor: async (root, args) => {
      const author = await findAuthor(args.name)
      if (!author) return null
      author.born = args.setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})