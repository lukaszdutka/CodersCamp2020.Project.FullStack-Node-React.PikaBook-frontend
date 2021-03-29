import { useState } from "react";
import Book from "../../Shared Components/BookMini";
import fetchBooks from "../../Shared Functions/fetchBooks";
import getPagination from "../../Shared Functions/getPagination";
import Pagination from "../../Shared Components/Pagination";

const Search = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("Let's start searching!");
  const [page, setPage] = useState(1);
  const onPageLimit = 10;

  const handleInputChange = (e) => {
    if (e.target.id === "searchTitle") return setSearchTitle(e.target.value);
    if (e.target.id === "searchLocation")
      return setSearchLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Searching...");
    setPage(1);
    const res = await fetchBooks(
      "https://pikabook.herokuapp.com/api/books?",
      searchTitle,
      searchLocation
    );
    if (res.error) setStatus(res.error);
    setBooks(res.books);
    if (books.length === 0) setStatus("No books found");
  };

  let bookList = getPagination(page, onPageLimit, books);
  bookList = bookList.map((book) => <Book key={book._id} book={book} />);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="searchTitle"
          placeholder="Book's title"
          value={searchTitle}
          onChange={handleInputChange}
        ></input>
        <input
          type="text"
          id="searchLocation"
          placeholder="Location"
          value={searchLocation}
          onChange={handleInputChange}
        ></input>
        <input type="submit" value="Search"></input>
      </form>
      <div>{books.length === 0 ? status : `${books.length} book(s) found`}</div>
      <div>{bookList}</div>
      {books.length > onPageLimit && (
        <Pagination
          page={page}
          setPage={setPage}
          list={books}
          limit={onPageLimit}
        />
      )}
    </div>
  );
};

export default Search;
