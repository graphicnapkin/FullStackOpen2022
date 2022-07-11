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
