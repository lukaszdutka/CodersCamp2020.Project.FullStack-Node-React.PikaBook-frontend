import { useState } from "react";

const Book = ({ data }) => {
  const {
    name,
    author,
    genres,
    year,
    publisher,
    description,
    ownerId,
  } = data;

  const authors = author.map((author, index) => {
      if (author <= author.length) return author + ', '; 
      return author
  })

  return (
    <div>
      <div className="bookData">
        <h1>{name}</h1>
        <p>{authors}</p>
      </div>
      <div className="userData"></div>
        <p></p>
    </div>
  );
};

const Search = ({ accessToken }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [books, setBooks] = useState("");

  const handleInputChange = (e) => {
    if (e.target.id === "searchTitle") return setSearchTitle(e.target.value);
    if (e.target.id === "searchLocation")
      return setSearchLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchBooks();
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
      console.log(res);
    } else {
      res = await res.json();
      setBooks(res);
    }
  };

  const bookList = books.map(book => <Book key={book._id} data={book} />)

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
      <div>
        {bookList}
      </div>
    </div>
  );
};

export default Search;
