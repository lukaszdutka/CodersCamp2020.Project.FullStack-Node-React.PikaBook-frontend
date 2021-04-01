const addBooksToList = (e, books, chosenBooks) => {
  if (!e.target.checked) {
    return chosenBooks.filter((book) => book._id !== e.target.id);
  }
  if (e.target.checked) {
    const newBook = books.find((book) => book._id === e.target.id);
    return [...chosenBooks, newBook];
  }
};

export default addBooksToList;
