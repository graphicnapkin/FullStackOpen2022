import { gql } from 'apollo-server'

export const typeDefs = gql`
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
    bookAdded(
      title: String!
      author: String!
      genres: [String!]!
      published: Int
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`
