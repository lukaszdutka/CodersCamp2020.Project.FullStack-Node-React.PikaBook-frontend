import { useHistory } from "react-router-dom";
import listProperties from "../SharedFunctions/listProperties";

const BookMini = ({ book: { name, author, ownerId } }) => {
  const history = useHistory();

  const handleOnClick = () => {
    history.push(`/user/${ownerId._id}`);
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
        onClick={handleOnClick}
      ></input>
    </div>
  );
};

export default BookMini;
