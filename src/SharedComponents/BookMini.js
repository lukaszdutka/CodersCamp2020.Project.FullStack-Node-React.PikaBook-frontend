import { useHistory } from "react-router-dom";

const BookMini = ({ book: { name, author, ownerId } }) => {
  const history = useHistory();

  const authorList = author.map((singleAuthor, index) => {
    if (index < author.length - 1) return singleAuthor + ", ";
    return singleAuthor;
  });

  const handleOnClick = () => {
    history.push(`/user/${ownerId._id}`);
  };

  return (
    <div>
      <div className="bookData">
        <h1>{name}</h1>
        <p>{authorList}</p>
      </div>
      <div className="userData">
        <p>{ownerId.name}</p>
        <p>{ownerId.location}</p>
      </div>
      <input
        type="button"
        value="User's profile"
        onClick={handleOnClick}
      ></input>
    </div>
  );
};

export default BookMini;
