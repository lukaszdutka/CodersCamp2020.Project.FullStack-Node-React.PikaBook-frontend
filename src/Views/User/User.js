import { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

import { searchUsersBooks } from "../../API/fetchBooks";
import { fetchOtherUser } from "../../API/fetchUser";
import Book from "../../SharedComponents/Book";
import PokeCreator from "./PokeCreator";
import MessageCreator from "./MessageCreator";

import "./User.scss";

const User = ({ accessToken }) => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [username, setUsername] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [chosenBooks, setChosenBooks] = useState([]);
  const [pokeCreatorVisible, setPokeCreatorVisible] = useState(false);
  const [messageCreatorVisible, setMessageCreatorVisible] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const getBooks = async () => {
      const chosenBookId = location.state.bookId;
      const res = await searchUsersBooks(id);
      if (res.error) console.log(res.error);
      if (res.books) {
        const bookList = res.books.sort((bookOne, bookTwo) => {
          return bookOne._id === chosenBookId
            ? -1
            : bookTwo._id === chosenBookId
            ? 1
            : 0;
        });
        setBooks(bookList);
      }
    };
    const getUserData = async () => {
      const res = await fetchOtherUser(id);
      if (res.error) console.log(res.error);
      if (res.user) {
        const { name, location } = res.user;
        setUsername(name);
        setUserLocation(location);
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
    if (chosenBooks.length > 0) history.push("/basket", { chosenBooks, id });
  };

  const handleCheckboxChange = (e) => {
    if (!e.target.checked) {
      const newBooks = chosenBooks.filter((book) => book._id !== e.target.id);
      setChosenBooks(newBooks);
    }
    if (e.target.checked) {
      const newBook = books.find((book) => book._id === e.target.id);
      setChosenBooks([...chosenBooks, newBook]);
    }
  };

  const bookList = books.map((book) => (
    <Book
      key={book._id}
      book={book}
      type="checkbox"
      handleCheckboxChange={handleCheckboxChange}
    />
  ));

  return (
    <div className="userContainer">
      <div className="usersBooks">
        <div>Books</div>
        {bookList}
      </div>
      <div>
        <p>{username}</p>
        <p>{userLocation}</p>
        <button onClick={handleSendMessage}>Send message</button>
      </div>
      <div>
        <button onClick={handleCreateBasket}>Add to basket</button>
        <p>OR</p>
        <button onClick={handleSendPoke}>Create poke</button>
      </div>
      {pokeCreatorVisible && (
        <PokeCreator
          accessToken={accessToken}
          recipientId={id}
          recipientName={username}
          recipientLocation={userLocation}
          books={chosenBooks}
          setPokeCreatorVisible={setPokeCreatorVisible}
        />
      )}
      {messageCreatorVisible && (
        <MessageCreator
          accessToken={accessToken}
          recipientId={id}
          recipientName={username}
          recipientLocation={userLocation}
          setMessageCreatorVisible={setMessageCreatorVisible}
        />
      )}
    </div>
  );
};

export default User;
