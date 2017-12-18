import React, { Component } from 'react';
import * as BooksAPI from './books-api';
import { BookState } from './book';
import { Bookshelf } from './bookshelf';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce'; 
import * as utils from './utils';

export class Search extends Component {
  
  state = {
    books: {}
  }

  search = debounce((query) => {
    if (!query) {
      return;
    }
    BooksAPI.search(query)
      .then((data) => {
        const states = BookState;
        const books = data.error ? [] : data;
        //
        // Server does not send any shelve info
        this.setState({
          books: utils.sortBooksByShelf(books, states)
        })
      })
  }, 500)

  updateData = (shelvesState) => {
    this.setState({
      books: utils.sortBooksByShelvesState(this.state.books.all, BookState, shelvesState)
    })
  }

  hasItems (collection) {
    return collection && collection.length > 0;
  }

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
            title='Not in any shelve'
            books={books.all || []}
            onUpdate={this.updateData}
            />
        </div>
      </div>
    )
  }
}
