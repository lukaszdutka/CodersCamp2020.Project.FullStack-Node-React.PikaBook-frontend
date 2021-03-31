import { useEffect, useState } from "react";
import { searchOneBook } from "../../API/fetchBooks";

import listProperties from "../../SharedFunctions/listProperties";
import sendPoke from "../../API/sendPoke";

const PokeCreator = ({
  accessToken,
  recipientId,
  booksId,
  recipientName,
  recipientLocation,
  setPokeCreatorVisible,
}) => {
  const [chosenBooks, setChosenBooks] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchChosenBooksData = async (books) => { 
      let fetchedBooks = [];
      await books.forEach(async (book) => {
        const res = await searchOneBook(book);
        if (res.error) console.log(res.error);
        if (res.book && !fetchedBooks.some((book) => book._id === res.book._id)) {
          fetchedBooks = [...fetchedBooks, res.book];
        }
        setChosenBooks(fetchedBooks);
      });
    };
    fetchChosenBooksData(booksId);
  }, [booksId]);

  const handleConfirm = async () => {
    const res = sendPoke(accessToken, recipientId, booksId);
    if (res.error) setStatus(res.error);
    if (res.created) setStatus("Poke successfully sent!");
  };

  const handleCancel = () => {
    setPokeCreatorVisible(false);
  };

  const bookList = chosenBooks.map((book) => {
    const { name, author, publisher, year } = book;
    return (
      <li>
        <b>{name}</b>
        {listProperties(author) && ` by ${listProperties(author)}`} {publisher}{" "}
        {year}
      </li>
    );
  });

  return (
    <div className="pokeCreatorContainer">
      <p>
        Confirm that you want to invite {recipientName} from {recipientLocation}{" "}
        to browse your book collection and make him/her know that you showed
        interest in the following books in their possession:
      </p>
      <ul>{bookList}</ul>
      {status}
      {status || <button onClick={handleConfirm}>Confirm</button>}
      <button onClick={handleCancel}>{status ? "Back" : "Cancel"}</button>
    </div>
  );
};

export default PokeCreator;
