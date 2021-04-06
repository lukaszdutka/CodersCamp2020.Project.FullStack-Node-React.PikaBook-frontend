import { useState, useRef } from "react";
import Book from "../../SharedComponents/BookMini";
import { searchAllBooks } from "../../API/fetchBooks";
import getPagination from "../../SharedFunctions/getPagination";
import Pagination from "../../SharedComponents/Pagination";

const Search = ({ loggedUser }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("Let's start searching!");
  const [page, setPage] = useState(1);
  const onPageLimit = 10;
  const scrollTo = useRef();

  const handleInputChange = (e) => {
    if (e.target.id === "searchTitle") return setSearchTitle(e.target.value);
    if (e.target.id === "searchLocation")
      return setSearchLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Searching...");
    setPage(1);
    const res = await searchAllBooks({
      name: searchTitle,
      location: searchLocation,
    });
    if (res.error) setStatus(res.error);
    const otherUsersBooks = res.books.filter(
      (book) => book.ownerId._id !== loggedUser._id
    );
    setBooks(otherUsersBooks);
    otherUsersBooks.length === 0 ? setStatus("No books found") : setStatus(`${otherUsersBooks.length} book(s) found`);
  };

  let bookList = getPagination(page, onPageLimit, books);
  bookList = bookList.map((book) => <Book key={book._id} book={book} />);

  return (
    <div className="search">
      <div className="logInAndRegistration">
        <form onSubmit={handleSubmit}>
          <input
            className="textInputDark"
            type="text"
            id="searchTitle"
            placeholder="Book's title"
            value={searchTitle}
            onChange={handleInputChange}
          ></input>
          <input
            className="textInputDark"
            type="text"
            id="searchLocation"
            placeholder="Location"
            value={searchLocation}
            onChange={handleInputChange}
          ></input> 
          <input className="buttonDark" type="submit" value="Search"></input>
          <div className="status">
            {status === "Searching..." ? <div className="loader"></div> : status}
          </div>
        </form>
      </div>
      <div ref={scrollTo}>
        {books.length > onPageLimit && (
          <Pagination
            page={page}
            setPage={setPage}
            list={books}
            limit={onPageLimit}
            scrollTo={scrollTo}
          />
        )}
        <div className="booksList">{bookList}</div>
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
    </div>
  );
};

export default Search;
