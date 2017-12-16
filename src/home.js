import React, { Component } from 'react';
import { BookState } from './book';
import { Bookshelf } from './bookshelf';
import * as BooksAPI from './books-api'
import { Link } from 'react-router-dom';

export class Home extends Component {
  
  state = {}

  componentDidMount () {
    this.updateData();
  }

  updateData = () => {
    return BooksAPI.getAll().then((books) => {
      this.setState({
        books: {
          all: books,
          inReading: this.getBooksByState(BookState.inReading, books),
          inWishList: this.getBooksByState(BookState.inWishList, books),
          read: this.getBooksByState(BookState.read, books)
        }
      })
    })
  }

  getBooksByState (state, books) {
    return books.filter(book => book.shelf === state)
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