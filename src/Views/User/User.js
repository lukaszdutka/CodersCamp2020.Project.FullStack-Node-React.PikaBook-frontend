import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { searchUsersBooks } from "../../API/fetchBooks";
import { fetchOtherUser } from "../../API/fetchUser";
import sendPoke from "../../API/sendPoke";
import Book from "../../SharedComponents/Book";

const User = ({ accessToken }) => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [chosenBooks, setChosenBooks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getBooks = async () => {
      const res = await searchUsersBooks(id);
      if (res.error) console.log(res.error);
      if (res.books) setBooks(res.books);
    };
    getBooks();
  }, [id]);

  useEffect(() => {
    const getUserData = async () => {
      const res = await fetchOtherUser(id);
      if (res.error) console.log(res.error);
      if (res.user) {
        const { name, location } = res.user;
        setUsername(name);
        setLocation(location);
      }
    };
    getUserData();
  }, [id]);

  const handleSendPoke = async () => {
    const res = sendPoke(accessToken, id, chosenBooks);
    console.log(res)
  };

  const handleCreateBasket = () => {
      history.push("/basket", { chosenBooks, id })
  }

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
    <div>
      <div>
        <div>Books</div>
        {bookList}
      </div>
      <div>
        <p>{username}</p>
        <p>{location}</p>
        <button>Send message</button>
      </div>
      <div>
        <button onClick={handleCreateBasket}>Add to basket</button>
        <p>OR</p>
        <button onClick={handleSendPoke}>Create poke</button>
      </div>
    </div>
  );
};

export default User;
