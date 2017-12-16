import React, { Component } from 'react';
import * as BooksAPI from './books-api';
import { Bookshelf } from './bookshelf';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce'; 

export class Search extends Component {
  
  state = {
    books: []
  }

  search = debounce((query) => {
    BooksAPI.search(query)
      .then((data) => {
        this.setState({ books: data.error ? [] : data })
      })
  }, 500)

  render () {
    const books = this.state.books;

    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input 
            type="text" 
            onChange={(e) => this.search(e.target.value)}
            placeholder="Search by title or author"/>
        </div>
      </div>
      <div className="search-books-results">
        <Bookshelf books={books}/>
      </div>
      </div>
    )
  }
}
