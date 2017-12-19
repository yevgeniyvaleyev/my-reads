import React, { Component } from 'react';
import { Bookshelf } from './bookshelf';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class Home extends Component {

  render () {
    const { booksState } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          { booksState ? (
            <div>
              <Bookshelf 
                title='Currently Reading'
                onUpdate={this.props.onShelvesUpdate}
                books={booksState.inReading || []} 
              />
              <Bookshelf 
                title='Want to Read'
                onUpdate={this.props.onShelvesUpdate}
                books={booksState.inWishList || []} 
              />
              <Bookshelf 
                title='Read'
                onUpdate={this.props.onShelvesUpdate}
                books={booksState.read || []} 
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

Home.propTypes = {
  booksState: PropTypes.object.isRequired,
  onShelvesUpdate: PropTypes.func.isRequired,
  shelvesState: PropTypes.object
}