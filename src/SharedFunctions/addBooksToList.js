const addBooksToList = (e, books, chosenBooks) => {
  if (!e.target.checked) {
    const newBooks = chosenBooks.filter((book) => book._id !== e.target.id);
    return newBooks;
  }
  if (e.target.checked) {
    const newBook = books.find((book) => book._id === e.target.id);
    return [...chosenBooks, newBook];
  }
};

export default addBooksToList;
