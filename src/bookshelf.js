import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Book, BookType } from './book';

export class Bookshelf extends Component {
  render () {
    const { title, books, onUpdate } = this.props;
    
    return (
      <div className="bookshelf">
        {title &&
          <h2 className="bookshelf-title">{title}</h2>
        }
        <div className="bookshelf-books">
          <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} onUpdate={onUpdate} />
            </li>
          ))}
          {books.length === 0 && 
            <li>Empty collection</li>
          }
          </ol>
      </div>
    </div>
    )
  }
}

Bookshelf.propTypes = {
  title: PropTypes.string,
  onUpdate: PropTypes.func,
  books: PropTypes.arrayOf(PropTypes.shape(BookType)).isRequired
}
