import { useState, useRef, useEffect } from "react";
import Book from "./Book";
import AddBook from "./AddBook";
import Pagination from "../../SharedComponents/Pagination";
import { searchMyBooks } from "../../API/fetchBooks";
import getPagination from "../../SharedFunctions/getPagination";

const MeBooks = ({ accessToken }) => {
  const [myBooks, setMyBooks] = useState([]);
  const [status, setStatus] = useState("Loading...");
  const [page, setPage] = useState(1);
  const [creatorVisible, setCreatorVisible] = useState(false);
  const onPageLimit = 10;
  const scrollTo = useRef();

  const getBooks = async (accessToken) => {
    const res = await searchMyBooks(accessToken);
    if (res.error) {
      console.log(res.error);
      setStatus("No books found.");
    }
    if (res.books) {
      setMyBooks(res.books);
      setStatus("");
    }
  };

  useEffect(() => {
    getBooks(accessToken);
  }, [accessToken]);

  let bookList = getPagination(page, onPageLimit, myBooks);
  bookList = bookList.map((book) => (
    <Book
      key={book._id}
      accessToken={accessToken}
      data={book}
      getBooks={getBooks}
      creatorVisible={creatorVisible}
      setCreatorVisible={setCreatorVisible}
    />
  ));

  return (
    <div className="meBooksContainer">
      <div className="meBooks" ref={scrollTo}>
        <h1 className="booksHeading">My books</h1>
        {bookList.length > 0 && bookList}
        {status && <div className="status">{status}</div>}
        {myBooks.length > onPageLimit && (
          <Pagination
            page={page}
            setPage={setPage}
            list={myBooks}
            limit={onPageLimit}
            scrollTo={scrollTo}
          />
        )}
      </div>
      <AddBook
        accessToken={accessToken}
        getBooks={getBooks}
        creatorVisible={creatorVisible}
      ></AddBook>
    </div>
  );
};

export default MeBooks;
