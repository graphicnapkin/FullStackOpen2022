require('dotenv').config()
import './db'
import { ApolloServer, gql } from 'apollo-server'
import Author from './models/author'
import Book from './models/books'
import { v1 } from 'uuid'

type ResolverFn = (parent: any, args: any) => any
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

  type Mutation {
    addAuthor(name: String!, born: Int): Author
    addBook(
      title: String!
      author: String!
      genres: [String!]!
      published: Int
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers: Resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    findAuthor: async (_, { name }) => Author.findOne({ name }),
    findBook: async (_, { title }) => Book.findOne({ title }),
    allAuthors: async () => Author.find({}),
    allBooks: async () => Book.find({}),
    /**
      let filter: { [key: string]: string } = {}
      if (args.author) filter.author = args.author
      //todo how to impliment filtering by any one of the genres via mongo query?
      return await Book.find(filter)
      **/
  },
  Author: {
    books: async (root) => Book.find({ author: root.name }),
    bookCount: async (root) => (await Book.find({ author: root.name })).length,
  },
  Book: {
    author: async (root) => {
      const author = await Author.find({ name: root.author })
      console.log(author)
      console.log(root)
      return author
    },
  },
  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      return author.save()
    },
    addBook: async (root, args) => {
      const book = new Book({ ...args })
      if (!(await Author.find({ name: args.author }))) {
        new Author({ name: args.author }).save()
      }
      return book.save()
    },
    editAuthor: (root, args) => {
      let updatedAuthor = {}
      return updatedAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  //@ts-ignore
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
