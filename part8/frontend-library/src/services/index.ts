import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("library-user-token")
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  }
})

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

//Site User
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const USER = gql`
  query {
    me {
      favouriteGenre
    }
  }
`

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
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      id
      published
      genres
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
