import { UserInputError, AuthenticationError } from 'apollo-server'
import Author from './models/author'
import Book from './models/books'
import User from './models/user'
import jwt, { Secret } from 'jsonwebtoken'
import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub()

type ResolverFn = (parent: any, args: any, context: any) => any
interface ResolverMap {
  [field: string]: ResolverFn
}
interface Resolvers {
  Query: ResolverMap
  Author: ResolverMap
  Book: ResolverMap
  Mutation: ResolverMap
  Subscription: ResolverMap
}

export const resolvers: Resolvers = {
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
    bookAdded: async (root, args, { currentUser }) => {
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
  Subscription: {
    bookAdded: {
      //@ts-ignore
      subscribe: () => pubsub.asyncItereator(['BOOK_ADDED']),
    },
  },
}

const getErrorMessage = (error: any) => {
  let message = ''
  if (error instanceof Error) message = error.message
  else message = String(error)
  return message
}
