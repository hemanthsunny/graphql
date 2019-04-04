import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getBooksQuery, getAuthorsQuery } from '../apollo/queries';
import { addBookMutation } from '../apollo/mutations';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }

  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (<option disabled>Loading authors</option>)
    }
    return data.authors.map(author => {
      return (<option key={author.id} value={author.id}>{author.name}</option>);
    })
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("event", this.state);
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authId: this.state.authorId
      },
      refetchQueries: [ { query: getBooksQuery } ]
    });
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.onSubmit.bind(this)}>
        <div className="field">
          <label>Book Name</label>
          <input type="text" onChange={(e) => this.setState({name: e.target.value})}/>
        </div>
        <div className="field">
          <label>Genre</label>
          <input type="text" onChange = {(e) => this.setState({genre: e.target.value})}/>
        </div>
        <div className="field">
          <label>Authors</label>
          <select onChange = {(e) => this.setState({authorId: e.target.value})}>
            <option>--Select one--</option>
            { this.displayAuthors() }
          </select>
        </div>
        <div className="field">
          <button className="addBtn">+</button>
        </div>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
// export default graphql(getAuthorsQuery)(AddBook);