import React, { Component } from 'react';
import { BookState } from './book';
import { Bookshelf } from './bookshelf';
import * as BooksAPI from './books-api'
import { Link } from 'react-router-dom';
import * as utils from './utils';

export class Home extends Component {
  
  state = {}

  componentDidMount () {
    this.getData();
  }

  getData = () => {
    return BooksAPI.getAll().then((books) => {
      this.setState({
        books: utils.sortBooksByShelf(books, BookState)
      })
    })
  }

  updateData = (shelvesState) => {
    this.setState({
      books: utils.sortBooksByShelvesState(this.state.books.all, BookState, shelvesState)
    })
  }

  render () {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          { this.state.books ? (
            <div>
              <Bookshelf 
                title='Currently Reading'
                onUpdate={this.updateData}
                books={this.state.books.inReading} 
              />
              <Bookshelf 
                title='Want to Read'
                onUpdate={this.updateData}
                books={this.state.books.inWishList} 
              />
              <Bookshelf 
                title='Read'
                onUpdate={this.updateData}
                books={this.state.books.read} 
              />
            </div>
          ) : (
            <em>Loading...</em>
          )}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
    )
  }
}