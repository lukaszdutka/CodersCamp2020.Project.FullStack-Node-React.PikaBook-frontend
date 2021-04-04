import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { searchMyBooks } from "../../API/fetchBooks";
import Book from "../../SharedComponents/Book";
import BasketCreator from "./BasketCreator";
import addBooksToList from "../../SharedFunctions/addBooksToList";
import getPagination from "../../SharedFunctions/getPagination";
import Pagination from "../../SharedComponents/Pagination";

const CreateBasket = ({ accessToken }) => {
  const location = useLocation();
  const user = location.state.user;
  const chosenBooks = location.state.chosenBooks;
  const [offeredBooks, setOfferedBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [basketCreatorVisible, setBasketCreatorVisible] = useState(false);
  const [chosenPage, setChosenPage] = useState(1);
  const [offeredPage, setOfferedPage] = useState(1);
  const onPageLimit = 10;

  useEffect(() => {
    const getBooks = async () => {
      const res = await searchMyBooks(accessToken);
      if (res.error) console.log(res.error);
      if (res.books) setMyBooks(res.books);
    };
    getBooks();
  }, [accessToken]);

  const handleCheckboxChange = (e) => {
    setOfferedBooks(addBooksToList(e, myBooks, offeredBooks));
  };

  const handleCreateBasket = async () => {
    setBasketCreatorVisible(true);
  };

  let chosenBooksList = getPagination(chosenPage, onPageLimit, chosenBooks);
  chosenBooksList = chosenBooksList.map((book) => (
    <Book key={book._id} book={book} />
  ));

  let myBooksList = getPagination(offeredPage, onPageLimit, myBooks);
  myBooksList = myBooksList.map((book) => (
    <Book
      key={book._id}
      book={book}
      type="checkbox"
      handleCheckboxChange={handleCheckboxChange}
      inputDisabled={basketCreatorVisible}
      chosenBooks={offeredBooks}
    />
  ));

  return (
    <div className="createBasketContainer">
      <div className="basketBookList">
        <div>
          <h1>Books chosen from {user.name}'s collection</h1>
          {chosenBooks.length > onPageLimit && (
            <Pagination
              page={chosenPage}
              setPage={setChosenPage}
              list={chosenBooks}
              limit={onPageLimit}
            />
          )}
          {chosenBooksList}
          {chosenBooks.length > onPageLimit && (
            <Pagination
              page={chosenPage}
              setPage={setChosenPage}
              list={chosenBooks}
              limit={onPageLimit}
            />
          )}
        </div>
        <div>
          <h1>My books</h1>
          {myBooks.length > onPageLimit && (
            <Pagination
              page={offeredPage}
              setPage={setOfferedPage}
              list={myBooks}
              limit={onPageLimit}
            />
          )}
          {myBooksList}
          {myBooks.length > onPageLimit && (
            <Pagination
              page={offeredPage}
              setPage={setOfferedPage}
              list={myBooks}
              limit={onPageLimit}
            />
          )}
        </div>
      </div>
      <button onClick={handleCreateBasket} disabled={offeredBooks.length < 1}>
        Create a basket
      </button>
      {basketCreatorVisible && (
        <BasketCreator
          accessToken={accessToken}
          booksOffered={offeredBooks}
          booksRequested={chosenBooks}
          recipient={user}
          setBasketCreatorVisible={setBasketCreatorVisible}
        />
      )}
    </div>
  );
};

export default CreateBasket;
