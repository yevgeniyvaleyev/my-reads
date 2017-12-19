import React, { Component } from 'react';
import * as BooksAPI from './books-api';
import { BookState } from './book';
import { Bookshelf } from './bookshelf';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce'; 
import PropTypes from 'prop-types';
import * as utils from './utils';

export class Search extends Component {
  
  state = {
    books: {}
  }

  search = debounce((query) => {
    if (!query) {
      return;
    }
    const { shelvesState } = this.props;
    const states = BookState;

    BooksAPI.search(query)
      .then((data) => {
        const books = data.error ? [] : data;
        this.setState({
          books: utils.sortBooksByShelvesState(books, states, shelvesState)
        });
      })
  }, 500)

  updateData = (shelvesState) => {
    const states = BookState;
    this.props.onShelvesUpdate(shelvesState);
    this.setState({
      books: utils.sortBooksByShelvesState(this.state.books.all, states, this.props.shelvesState)
    });
  }

  hasItems (collection) {
    return collection && collection.length > 0;
  }

  render () {
    const books = this.state.books;
    const searchResults = this.hasItems(books.none) ? books.none : books.all;

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
          { this.hasItems(books.inReading) && 
            <Bookshelf 
              title='Currently Reading'
              onUpdate={this.updateData}
              books={books.inReading} 
            />
          }
          { this.hasItems(books.inWishList) && 
            <Bookshelf 
              title='Want to Read'
              onUpdate={this.updateData}
              books={books.inWishList} 
            />
          }
          { this.hasItems(books.read) && 
            <Bookshelf 
              title='Read'
              onUpdate={this.updateData}
              books={books.read} 
            />
          }
          <Bookshelf 
            title='Search results'
            books={searchResults || []}
            onUpdate={this.updateData}
            />
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  onShelvesUpdate: PropTypes.func.isRequired,
  shelvesState: PropTypes.object.isRequired
}
