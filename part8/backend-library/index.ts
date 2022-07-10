import { ApolloServer, gql } from 'apollo-server'
import { v1 } from 'uuid'
const uuid = v1

type ResolverFn = (parent: any, args: any) => any
interface ResolverMap {
  [field: string]: ResolverFn
}
interface Resolvers {
  Query: ResolverMap
  Author: ResolverMap
  Mutation: ResolverMap
}

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

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

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
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addAuthor(name: String!, born: Int): Author
    addBook(title: String!, author: String!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers: Resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    findAuthor: (_, { name }) => authors.find((a) => a.name === name),
    findBook: (_, { title }) => books.find((b) => b.title === title),
    allAuthors: () => authors,
    allBooks: (root, args) => {
      let filteredBooks = [...books]
      if (args.author)
        filteredBooks = filteredBooks.filter((b) => b.author === args.author)
      if (args.genre) {
        filteredBooks = filteredBooks.filter((b) =>
          b.genres.some((g) => g === args.genre)
        )
      }
      return filteredBooks
    },
  },
  Author: {
    books: (root) => books.filter((b) => b.author === root.name),
    bookCount: (root) => books.filter((b) => b.author === root.name).length,
  },
  Mutation: {
    addAuthor: (root, args) => {
      const author = { ...args, id: uuid() }
      authors = [...authors, author]
      return author
    },
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      if (!authors.find((a) => a.name === args.author)) {
        authors = [...authors, { name: args.author, id: uuid() }]
      }
      books = [...books, book]
      return book
    },
    editAuthor: (root, args) => {
      let updatedAuthor = {} as typeof authors[0]
      authors = authors.map((a) => {
        if (a.name !== args.name) return a
        updatedAuthor = { ...a, born: args.setBornTo }
        return updatedAuthor
      })
      if (!updatedAuthor.name) return null
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