import { useState } from "react";
import Book from "./Book";

const Search = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("Let's start searching!");

  const handleInputChange = (e) => {
    if (e.target.id === "searchTitle") return setSearchTitle(e.target.value);
    if (e.target.id === "searchLocation")
      return setSearchLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    setStatus("Searching...");
    e.preventDefault();
    searchBooks();
    if (books.length === 0) setStatus("No books found");
  };

  const searchBooks = async () => {
    let res = await fetch(
      "https://pikabook-api.herokuapp.com/api/books?" +
        new URLSearchParams({
          name: searchTitle,
          location: searchLocation,
        })
    );
    if (!res.ok) {
      res = await res.text();
      status(res);
    } else {
      res = await res.json();
      setBooks(res);
    }
  };

  const bookList = books.map((book) => <Book key={book._id} data={book} />);

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
      <div>{bookList.length === 0 ? status : bookList}</div>
    </div>
  );
};

export default Search;
