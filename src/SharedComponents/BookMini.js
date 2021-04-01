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
    <div className="book">
      <div className="bookData">
        <h3>{name}</h3>
        <p>{authorList}</p>
      </div>
      <div className="userData">
        <p>{ownerId.name}</p>
        <p>{ownerId.location} {ownerId.location && <i className="fas fa-map-marker-alt"> </i>}</p>
      </div>
      <input
        className="buttonDark"
        type="button"
        value="User's profile"
        onClick={handleOnClick}
      ></input>
    </div>
  );
};

export default BookMini;
