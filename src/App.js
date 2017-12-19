import React, { Component} from 'react'
import { Route } from 'react-router-dom'
import { Home } from './home';
import { Search } from './search';
import { BookState } from './book';
import * as BooksAPI from './books-api';
import * as utils from './utils';
import './App.css';

class BooksApp extends Component {
  state = {
    shelves: {},
    books: {}
  }

  updateShelve = (shelves) => {
    this.setState({ shelves });
    const books = utils.sortBooksByShelvesState(this.state.books.all, BookState, shelves);
    this.setState({ books });
  }

  componentDidMount () {
    this.getData();
  }

  getData () {
    return BooksAPI.getAll().then((books) => {
      this.setState({
        books: utils.sortBooksByShelf(books, BookState)
      });
      this.setState({ shelves: utils.getShelvesState(books) });
    })
  }

  render() {

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Home 
            booksState={this.state.books}
            shelvesState={this.state.shelves}
            onShelvesUpdate={this.updateShelve} />
        )}/>
        <Route path='/search' render={() => (
          <Search 
            shelvesState={this.state.shelves}
            onShelvesUpdate={this.updateShelve} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
