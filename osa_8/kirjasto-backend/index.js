const { ApolloServer } = require('@apollo/server')
const { gql } = require('graphql-tag')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuidv4 } = require('uuid')
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

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

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
      return args.genre ? args.author ? Book.find({ author: args.author, genre: args.genre }) : Book.find({ genre: args.genre }) : args.author ? Book.find({ author: args.author }) : Book.find({}) // FIXME: does not work as gneres is an array and author is an object
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      return Book.find({}).filter(one => one.author === root.name).length // FIXME: filter on the mongodb side
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await findAuthor(args.author)
      !author ? author = new Author({ name: args.author }).save() : null
      const book = new Book({ author: authro, ...args })
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