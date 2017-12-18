import React, { Component} from 'react'
import { Route } from 'react-router-dom'
import { Home } from './home';
import { Search } from './search';

import './App.css';

class BooksApp extends Component {
  
  render() {

    return (
      <div className="app">
        <Route exact path='/' component={Home}/>
        <Route path='/search' component={Search}/>
      </div>
    )
  }
}

export default BooksApp
