import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BookshelfChanger } from './bookshelf-changer';
import * as BooksAPI from './books-api';


export const BookState = {
  inReading: 'currentlyReading',
  inWishList: 'wantToRead',
  read: 'read'
}

export class Book extends Component {

  updateShelf = (newShelf) => {
    BooksAPI.update(this.props.book, newShelf)
      .then(this.props.onUpdate)
  }

  render () {
    const { book } = this.props;
    const image = book.imageLinks ? book.imageLinks.smallThumbnail : '';
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${image}")` }}></div>
          <BookshelfChanger 
            onSelect={this.updateShelf}
            state={book.shelf} />
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          <div className="book-authors">{book.authors.join(', ')}</div>
        }
      </div>
    )
  }
}

export const BookType = {
  authors: PropTypes.arrayOf(PropTypes.string),
  shelf: PropTypes.string,
  title: PropTypes.string.isRequired,
  imageLinks: PropTypes.shape({
    smallThumbnail: PropTypes.string,
    thumbnail: PropTypes.string      
  })
}

Book.propTypes = {
  onUpdate: PropTypes.func,
  book: PropTypes.shape(BookType).isRequired
}