import { useState, useEffect, useRef } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

import { searchUsersBooks } from "../../API/fetchBooks";
import { fetchOtherUser } from "../../API/fetchUser";
import addBooksToList from "../../SharedFunctions/addBooksToList";
import Book from "../../SharedComponents/Book";
import PokeCreator from "./PokeCreator";
import MessageCreator from "./MessageCreator";
import getPagination from "../../SharedFunctions/getPagination";
import Pagination from "../../SharedComponents/Pagination";

const User = ({ accessToken }) => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState("");
  const [chosenBooks, setChosenBooks] = useState([]);
  const [pokeCreatorVisible, setPokeCreatorVisible] = useState(false);
  const [messageCreatorVisible, setMessageCreatorVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const onPageLimit = 4;
  const scrollTo = useRef();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setStatus("Loading...");
    const getBooks = async () => {
      const chosenBookId = location.state.bookId;
      const res = await searchUsersBooks(id);
      if (res.error) setStatus(res.error);
      if (res.books) {
        let bookList = res.books.filter((book) => !book.exchanged);
        bookList = res.books.sort((bookOne, bookTwo) => {
          return bookOne._id === chosenBookId
            ? -1
            : bookTwo._id === chosenBookId
            ? 1
            : 0;
        });
        setBooks(bookList);
        setStatus("");
      }
    };
    const getUserData = async () => {
      const res = await fetchOtherUser(id);
      if (res.error) console.log(res.error);
      if (res.user) {
        setUser(res.user);
      }
    };
    getBooks();
    getUserData();
  }, [id, location.state.bookId]);

  const handleSendMessage = () => {
    !pokeCreatorVisible && setMessageCreatorVisible(true);
  };

  const handleSendPoke = async () => {
    !messageCreatorVisible && setPokeCreatorVisible(true);
  };

  const handleCreateBasket = () => {
    history.push("/basket", { chosenBooks, user });
  };

  const handleCheckboxChange = (e) => {
    setChosenBooks(addBooksToList(e, books, chosenBooks));
  };

  let bookList = getPagination(page, onPageLimit, books);
  bookList = bookList.map((book) => (
    <Book
      key={book._id}
      book={book}
      type="checkbox"
      handleCheckboxChange={handleCheckboxChange}
      inputDisabled={pokeCreatorVisible || messageCreatorVisible}
      chosenBooks={chosenBooks}
    />
  ));

  return (
    <div className="userContainer">
      <div className="usersBooks" ref={scrollTo}>
        <h1 className="booksHeading">Books</h1>
        {status ? status : bookList}
        {books.length > onPageLimit && (
          <Pagination
            page={page}
            setPage={setPage}
            list={books}
            limit={onPageLimit}
            scrollTo={scrollTo}
          />
        )}
      </div>
      <div className="userPanel">
        <div className="userInfo">
          <p>{user.name}</p>
          {user.location && (
            <p>
              <i className="fas fa-map-marker-alt"></i> {user.location}
            </p>
          )}
          <button className="buttonDark" onClick={handleSendMessage}>
            Send message
          </button>
        </div>
        <div className="userInfo">
          <button
            className="buttonDark"
            onClick={handleCreateBasket}
            disabled={chosenBooks.length < 1}
          >
            Add to basket
          </button>
          <p className="or">OR</p>
          <button className="buttonDark" onClick={handleSendPoke}>
            Create poke
          </button>
        </div>
      </div>
      {pokeCreatorVisible && (
        <PokeCreator
          accessToken={accessToken}
          recipient={user}
          books={chosenBooks}
          setPokeCreatorVisible={setPokeCreatorVisible}
        />
      )}
      {messageCreatorVisible && (
        <MessageCreator
          accessToken={accessToken}
          recipient={user}
          setMessageCreatorVisible={setMessageCreatorVisible}
        />
      )}
    </div>
  );
};

export default User;
