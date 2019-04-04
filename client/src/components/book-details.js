import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBookQuery } from '../apollo/queries';

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2 key={book.name}>{book.name}</h2>
          <p key={book.author.name}>{book.author.name}</p>
          <p>All books by author are -</p>
          <ul className="other-books">
            {
              book.author.books.map(item => {
                return (<li key = {item.id} > { item.name } </li>);
              })
            }
          </ul>
        </div>
      )
    } else {
      return (<div> No book selected yet.. </div>)
    }
  }

  render() {
    return (
      <div id="book-details">
        { this.displayBookDetails() }
      </div>
    )
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);
