import React, { Component } from 'react';
import { BookState } from './book';
import PropTypes from 'prop-types';

export class BookshelfChanger extends Component {
  
  state = {}

  changerActions = {
    [BookState.inReading]: 'Currently Reading',
    [BookState.inWishList]: 'Want to Read',
    [BookState.read]: 'Read'
  }

  render () {

    const { state = 'none', onSelect } =this.props;
    
    return (
      <div className="book-shelf-changer">
        <select 
          defaultValue={state}
          onChange={(e) => onSelect(e.target.value)}>
          <option value="none" disabled>Move to...</option>
          {Object.keys(this.changerActions).map((key) => (
              <option 
                value={key} 
                key={key}>
                {this.changerActions[key]}
              </option>
            ))}
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

BookshelfChanger.propTypes = {
  state: PropTypes.string,
  onSelect: PropTypes.func
}