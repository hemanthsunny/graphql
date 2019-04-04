import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { BookDetails } from './';
import { getBooksQuery } from '../apollo/queries';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null
    }
  }

  displayBookList() {
    var data = this.props.data;
    console.log("THIS>list", data)
    if (data.loading) {
      return (<div>Loading books...</div>);
    } else {
      return data.books.map(book => {
        return (<li key={book.id} onClick={(e) => this.setState({selectedId: book.id})}>{book.name}</li>)
      });
    }
  }

  render() {
    return (
      <div id="book-list">
        <ul className="book-list">
          {this.displayBookList()}
        </ul>
        <BookDetails bookId={this.state.selectedId}/>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);
