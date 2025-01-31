import { gql } from '@apollo/client'

const ALL_BOOKS = gql`
  query allDemBooks(
    $author: String,
    $genre: String
  ) { 
    allBooks(
      author: $author,
      genre: $genre
    ) {
      title, 
      author {
        name
      }, 
      published,
      genres
    }
  }
`

const ADD_BOOK = gql`
  mutation addNewBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author {
        name
      },
      published
    }
  }
`

const ALL_AUTHORS = gql`
  query { 
    allAuthors {
      name, 
      born, 
      bookCount
    }
  }
`

const EDIT_AUTHOR_BIRTHYEAR = gql`
  mutation editBirthyear(
    $name: String!,
    $birthyear: Int!
  ){ 
    editAuthor(
      name: $name,
      setBornTo: $birthyear
    ) { 
        name,
        born,
        bookCount 
      }
  }
`

const LOGIN = gql`
  mutation logIn(
    $username: String!,
    $password: String!
  ){
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

export { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR_BIRTHYEAR, LOGIN }