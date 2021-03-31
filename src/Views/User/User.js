import { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

import { searchUsersBooks } from "../../API/fetchBooks";
import { fetchOtherUser } from "../../API/fetchUser";
import Book from "../../SharedComponents/Book";
import PokeCreator from "./PokeCreator";

import "./User.scss";

const User = ({ accessToken }) => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [username, setUsername] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [chosenBooks, setChosenBooks] = useState([]);
  const [pokeCreatorVisible, setPokeCreatorVisible] = useState(false);
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
    getBooks();
  }, [id, location.state.bookId]);

  useEffect(() => {
    const getUserData = async () => {
      const res = await fetchOtherUser(id);
      if (res.error) console.log(res.error);
      if (res.user) {
        const { name, location } = res.user;
        setUsername(name);
        setUserLocation(location);
      }
    };
    getUserData();
  }, [id]);

  const handleSendPoke = async () => {
    setPokeCreatorVisible(true);
  };

  const handleCreateBasket = () => {
    history.push("/basket", { chosenBooks, id });
  };

  const handleCheckboxChange = (e) => {
    if (!e.target.checked) {
      const chosenBooksNew = chosenBooks.filter((book) => book !== e.target.id);
      setChosenBooks(chosenBooksNew);
    }
    if (e.target.checked) {
      const newBook = e.target.id;
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
        <button>Send message</button>
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
          booksId={chosenBooks}
          setPokeCreatorVisible={setPokeCreatorVisible}
        />
      )}
    </div>
  );
};

export default User;
