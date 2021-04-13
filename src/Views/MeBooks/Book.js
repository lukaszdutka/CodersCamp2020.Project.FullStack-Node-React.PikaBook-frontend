import { useState } from "react";
import EditBook from "./EditBook";
import listProperties from "../../SharedFunctions/listProperties";
import { deleteBook } from "../../API/deleteBook";

const Book = ({
  accessToken,
  data,
  getBooks,
  creatorVisible,
  setCreatorVisible,
}) => {
  const { name, author, genres, year, publisher, description, _id } = data;
  const [editBookVisible, setEditBookVisible] = useState(false);
  const [status, setStatus] = useState();

  const handleEditBook = async () => {
    setCreatorVisible(true);
    setEditBookVisible(true);
  };

  const handleRemoval = async (e) => {
    setStatus("Request...");
    e.preventDefault();
    const res = await deleteBook(accessToken, _id);
    if (res.error) setStatus(res.error);
    if (res.deleted) setStatus("Book deleted");
    getBooks(accessToken);
  };

  return (
    <div className="bookContainer">
      <div className="bookInfo">
        <p className="bookTitle">
          <b>{name}</b>
        </p>
        {author.length > 0 && (
          <p className="author">
            <b>Author:</b> {listProperties(author)}
          </p>
        )}
        {publisher && (
          <p className="publisher">
            <b>Publisher:</b> {publisher}
          </p>
        )}
        {year && (
          <p className="year">
            <b>Publication year:</b> {year}
          </p>
        )}
        {genres.length > 0 && (
          <p className="genres">
            <b>Genre:</b> {listProperties(genres)}
          </p>
        )}
        {description && (
          <p className="description">
            <b>Description:</b> {description}
          </p>
        )}
        <div className="meBooksButtons">
          <button className="buttonDark" onClick={handleRemoval} disabled={creatorVisible}>
            Delete
          </button>
          <button className="buttonDark" onClick={handleEditBook} disabled={creatorVisible}>
            Edit
          </button>
        </div>
        {status && (
          <div className="status">
            {status === "Request..." ? <div className="loader"></div> : status}
          </div>
        )}
        {editBookVisible && (
          <EditBook
            accessToken={accessToken}
            setEditBookVisible={setEditBookVisible}
            bookData={data}
            getBooks={getBooks}
            setCreatorVisible={setCreatorVisible}
          />
        )}
      </div>
    </div>
  );
};

export default Book;
