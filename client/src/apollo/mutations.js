import { gql } from 'apollo-boost';

const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authId: ID!){
    addBook(name: $name, genre: $genre, authId: $authId) {
      name
      id
    }
  }
`;

export { addBookMutation };
