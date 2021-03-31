import { useHistory } from "react-router-dom";
import listProperties from "../../SharedFunctions/listProperties";

const BookMini = ({ book: { name, author, ownerId, _id } }) => {
  const history = useHistory();

  const handleOnClick = (e) => {
    history.push(`/user/${ownerId._id}`, {bookId: e.target.id});
  };

  return (
    <div>
      <div className="bookData">
        <h1>{name}</h1>
        <p>{listProperties(author)}</p>
      </div>
      <div className="userData">
        <p>{ownerId.name}</p>
        <p>{ownerId.location}</p>
      </div>
      <input
        type="button"
        value="User's profile"
        id={_id}
        onClick={handleOnClick}
      ></input>
    </div>
  );
};

export default BookMini;
