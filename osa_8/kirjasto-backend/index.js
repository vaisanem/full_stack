const { ApolloServer } = require('@apollo/server')
const { gql } = require('graphql-tag')
const { GraphQLError } = require('graphql');
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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

const validateUser = (user, action) => {
  if (!user) {
    throw new GraphQLError('Authentication failed', {
      extensions: {
        code: 'UNAUTHORIZED',
        fyi: 'You must be logged in to ${action}'
      }
    })
  }
}

const validateAuthorName = (name) => {
  if (name.length < 4) {
    throw new GraphQLError('Author name is too short', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: name
      }
    })
  }
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
    allAuthors: async () => Author.find({}),
    me: async (root, args, { currentUser }) => {
      return currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = await findAuthor(root.name)
      return Book.countDocuments({ author: author._id })
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      validateUser(currentUser, 'add a book')
      validateAuthorName(args.author)
      let author = await findAuthor(args.author)
      !author ? author = await new Author({ name: args.author, born: null }).save() : null
      const book = new Book({ author: author, title: args.title, published: args.published, genres: args.genres })

      try {
        return await book.save()
      } catch (error) {
          throw new GraphQLError('Book creation failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              fyi: error.message
            }
          }) 
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      validateUser(currentUser, 'edit an author')
      validateAuthorName(args.name)
      let author;
      author = await findAuthor(args.name)

      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: {
            code: 'NOT_FOUND',
            invalidArgs: args.name,
          }
        })
      }

      author.born = args.setBornTo

      try {
        return author.save()
      } catch (error) {
        throw new GraphQLError('I hope this will never be executed', {
          extensions: {
            code: 'INTERNAL SERVER ERROR',
            invalidArgs: args.setBornTo,
            fyi: error.message
          }
        })
      }
    },
    createUser: (root, args) => {
      const user = await new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      try {
        user.save()
      } catch (error) {
        throw new GraphQLError('User creation failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            fyi: error.message
          }
        })
      }
    },
    login: async (root, args) => {
      const password = process.env.UNIVERSAL_PASSWORD_IS_KIRJA123
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== password) {
        throw new GraphQLError('Login failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            fyi: 'Invalid username, user not found or password incorrect'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const trimmedToken = auth.substring(7)
      const decodedToken = jwt.verify(
        trimmedToken, process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
    return { currentUser: null }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})