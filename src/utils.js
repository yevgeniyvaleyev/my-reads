export function getBooksByState (state, books) {
  return books.filter(book => book.shelf === state)
}

export function getBooksByIds (ids, books) {
  return books.filter(book => ids.includes(book.id))
}

export function sortBooksByShelf (books, BookState) {
  return {
    all: books,
    inReading: getBooksByState(BookState.inReading, books),
    inWishList: getBooksByState(BookState.inWishList, books),
    read: getBooksByState(BookState.read, books)
  }
}

export function updateBooksInShelve (books, shelve, shelvesState) {
  return getBooksByIds(shelvesState[shelve], books).map(book => ({ ...book, shelf: shelve }))
}

export function sortBooksByShelvesState (books, bookState, shelvesState) {
  
  const inReading = updateBooksInShelve(books, bookState.inReading, shelvesState);
  const inWishList = updateBooksInShelve(books, bookState.inWishList, shelvesState);
  const read = updateBooksInShelve(books, bookState.read, shelvesState);

  return {
    all: books,
    inReading,
    inWishList,
    read
  }
}