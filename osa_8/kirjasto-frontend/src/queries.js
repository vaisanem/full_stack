import { gql } from '@apollo/client'

const ALL_BOOKS = gql`
  query { 
    allBooks {
      title, 
      author {
        name
      }, 
      published
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
        author,
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

export { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR_BIRTHYEAR }