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
    read: getBooksByState(BookState.read, books),
    none: getBooksByState(BookState.none, books)
  }
}

export function updateBooksInShelve (books, shelf, shelvesState) {
  const ids = shelvesState[shelf] || [];
  return getBooksByIds(ids, books).map(book => ({ ...book, shelf }))
}

export function getShelvesState (books) {
  const state = {}
  books.forEach((book) => {
    const key = book.shelf || 'none';
    state[key] = state[key] || [];
    state[key].push(book.id);
  });
  return state;
}

export function sortBooksByShelvesState (books, bookState, shelvesState) {
  const isBookNotInShefState = (book) =>
    !shelvesState[bookState.inReading].includes(book.id) &&
    !shelvesState[bookState.inWishList].includes(book.id) &&
    !shelvesState[bookState.read].includes(book.id);
  const inReading = updateBooksInShelve(books, bookState.inReading, shelvesState);
  const inWishList = updateBooksInShelve(books, bookState.inWishList, shelvesState);
  const read = updateBooksInShelve(books, bookState.read, shelvesState);
  const none = books.filter(isBookNotInShefState);

  return {
    all: books,
    inReading,
    inWishList,
    none,
    read
  }
}