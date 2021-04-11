import listProperties from "../SharedFunctions/listProperties";

const Book = ({
  book: { _id, name, author, genres, publisher, year, description },
  type,
  handleCheckboxChange,
  inputDisabled,
  chosenBooks,
}) => {
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
      </div>
      {type === "checkbox" && (
        <input
          className="checkboxStyled"
          type="checkbox"
          onChange={handleCheckboxChange}
          id={_id}
          disabled={inputDisabled}
          checked={chosenBooks.some((book) =>
            book._id === _id ? true : false
          )}
        ></input>
      )}
    </div>
  );
};

export default Book;
