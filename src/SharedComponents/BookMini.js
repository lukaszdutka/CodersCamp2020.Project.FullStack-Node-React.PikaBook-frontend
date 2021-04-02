import { useHistory } from "react-router-dom";
import listProperties from "../SharedFunctions/listProperties";

const BookMini = ({ book: { name, author, ownerId, _id } }) => {
  const history = useHistory();

  const handleOnClick = (e) => {
    history.push(`/user/${ownerId._id}`, {bookId: e.target.id});
  };

  return (
    <div className="book">
      <div className="bookData">
        <h3>{name}</h3>
        <p>{listProperties(author)}</p>
      </div>
      <div className="userData">
        <p>{ownerId.name}</p>
        <p>{ownerId.location} {ownerId.location && <i className="fas fa-map-marker-alt"> </i>}</p>
      </div>
      <input
        className="buttonDark"
        type="button"
        value="User's profile"
        id={_id}
        onClick={handleOnClick}
      ></input>
    </div>
  );
};

export default BookMini;
