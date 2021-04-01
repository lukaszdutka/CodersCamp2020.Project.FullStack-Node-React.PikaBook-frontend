import listProperties from "../SharedFunctions/listProperties";

const Book = ({
  book: { _id, name, author, genres, publisher, year, description },
  type,
  handleCheckboxChange,
  inputDisabled,
  chosenBooks,
}) => {
  return (
    <div>
      <div className="bookData">
        <h1>{name}</h1>
        <p>{listProperties(author)}</p>
        <p>{publisher}</p>
        <p>{year}</p>
        <p>{listProperties(genres)}</p>
        <p>{description}</p>
      </div>
      {type === "checkbox" && (
        <input
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
