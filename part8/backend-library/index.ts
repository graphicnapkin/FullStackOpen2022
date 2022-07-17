require('dotenv').config()
import './db'
import {
  ApolloServer,
  AuthenticationError,
  gql,
  UserInputError,
} from 'apollo-server'
import jwt, { Secret } from 'jsonwebtoken'

import Author from './models/author'
import Book from './models/books'
import User from './models/user'

type ResolverFn = (parent: any, args: any, context: any) => any
interface ResolverMap {
  [field: string]: ResolverFn
}
interface Resolvers {
  Query: ResolverMap
  Author: ResolverMap
  Book: ResolverMap
  Mutation: ResolverMap
}

const typeDefs = gql`
  type Query {
    authorCount: Int!
    bookCount: Int!
    findAuthor(name: String!): Author
    findBook(title: String!): Book
    allAuthors: [Author]!
    allBooks(author: String, genre: String): [Book]!
    me: User
  }

  type Author {
    books: [Book]
    bookCount: Int!
    name: String!
    id: ID!
    born: Int
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addAuthor(name: String!, born: Int): Author
    addBook(
      title: String!
      author: String!
      genres: [String!]!
      published: Int
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers: Resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    findAuthor: async (_, { name }) => Author.findOne({ name }),
    findBook: async (_, { title }) => Book.findOne({ title }),
    allAuthors: async () => Author.find({}),
    allBooks: async (root, args) => {
      let filter: { [key: string]: any } = {}
      if (args.author) filter.author = args.author
      if (args.genre) filter.genres = { $elemMatch: { $eq: args.genre } }
      return Book.find(filter)
    },
    me: async (root, args, context) => context.currentUser,
  },
  Author: {
    books: async (root) => Book.find({ author: root.name }),
    bookCount: async (root) => (await Book.find({ author: root.name })).length,
  },
  Book: {
    author: async (root) => {
      const results = await Author.findOne({ name: root.author })
      return results
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        user.save()
      } catch (error) {
        throw new UserInputError(getErrorMessage(error))
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      console.log(user)
      if (!user || args.password !== 'poop') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET as Secret) }
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(getErrorMessage(error), {
          invalidArgs: args,
        })
      }
      return author.save()
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('not authenticated')
      const book = new Book({ ...args })
      if (!(await Author.find({ name: args.author }))) {
        new Author({ name: args.author }).save()
      }
      return book.save()
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('not authenticated')
      console.log(currentUser)
      let updatedAuthor = await Author.findOne({ name: args.name })
      if (!updatedAuthor)
        throw new UserInputError('no author found with that name')
      updatedAuthor.born = args.setBornTo
      return updatedAuthor.save()
    },
  },
}

const getErrorMessage = (error: any) => {
  let message = ''
  if (error instanceof Error) message = error.message
  else message = String(error)
  return message
}

const server = new ApolloServer({
  typeDefs,
  //@ts-ignore
  resolvers,
  context: async ({ req }) => {
    try {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET as Secret
        )
        //@ts-ignore
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    } catch (error) {
      throw new AuthenticationError('invalid bearer token')
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
