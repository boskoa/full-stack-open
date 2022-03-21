const { v1: uuid } = require('uuid')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

/*
let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]
*/

const JWT_SECRET = 'SOME_SECRET_KEY'

const resolvers = {
  Query: {
    bookCount: async () => await Book.find({}).length,
    authorCount: async () => await Author.find({}).length,
    allBooks: async (root, args) => {
      let author = null

      if (args.author) {
        author = await Author.findOne({ name: args.author })
      }

      let filter = {}

      if (args.genre && args.author) {
        filter = { genres: { $in: args.genre }, author: author.id }
      } else if (args.genre) {
        filter = { genres: { $in: args.genre } }
      } else if (args.author) {
        filter = { author: author.id }
      }
      console.log('ALL_BOOKS')

      return await Book.find(filter).populate('author')
    },
    allAuthors: async (root, args) => {
      console.log('ALL_AUTHORS')
      if (!args.name) {
        return await Author.find({})
      }

      return await Author.find({ name: args.name })
    },
    me: async (root, args, { currentUser }) => {
      return currentUser
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!args) {
        throw new UserInputError('Input missing')
      }

      if (!currentUser) {
        throw new UserInputError('Not authenticated')
      }

      let newAuthor = await Author.findOne({ name: args.author })

      if (!newAuthor) {
        newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const newBook = new Book({ ...args, author: newAuthor })
      try {
        await newBook.save()
        const count = await Book.find({ author: newAuthor.id }).countDocuments()
        await Author.findOneAndUpdate(
          { name: newAuthor.name },
          { bookCount: count }
        )
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new UserInputError('Not authenticated')
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.born
      try {
        author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const newUser = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })

      try {
        await newUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return newUser
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong credentials.')
      }

      const userForToken = { username: user.username, id: user._id }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
