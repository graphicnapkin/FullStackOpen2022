import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client"

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000",
  }),
})

//Authors
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
      books {
        id
      }
    }
  }
`

export const FIND_AUTHOR = gql`
  query findAuthorByName($nameToSearch: String!) {
    findAuthor(name: $nameToSearch) {
      name
      bookCount
      id
      born
      books {
        title
        published
        id
        genres
      }
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      id
    }
  }
`

//Books
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      id
      published
      author {
        id
        name
      }
    }
  }
`

export const NEW_BOOK = gql`
  mutation newBook($title: String!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, author: $author, genres: $genres) {
      id
    }
  }
`
