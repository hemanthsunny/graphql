import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`
const getBookQuery = gql`
  query ($id: ID!) {
    book (id: $id){
      name
      id
      author {
        name
        id
        books {
          name
        }
      }
    }
  }
`

export { getBooksQuery, getAuthorsQuery, getBookQuery };
