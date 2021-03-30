import listProperties from "../SharedFunctions/listProperties";

const Book = ({
  book: { _id, name, author, genres, publisher, year, description },
  type,
  handleCheckboxChange,
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
        <input type="checkbox" onChange={handleCheckboxChange} id={_id}></input>
      )}
    </div>
  );
};

export default Book;
