import {  useState } from "react";

import listProperties from "../../SharedFunctions/listProperties";
import sendPoke from "../../API/sendPoke";

const PokeCreator = ({
  accessToken,
  recipientId,
  books,
  recipientName,
  recipientLocation,
  setPokeCreatorVisible,
}) => {
  const [status, setStatus] = useState("");

  const handleConfirm = async () => {
    const booksId = books.map(book => book._id);
    const res = sendPoke(accessToken, recipientId, booksId);
    if (res.error) setStatus(res.error);
    if (res.created) setStatus("Poke successfully sent!");
  };

  const handleCancel = () => {
    setPokeCreatorVisible(false);
  };

  const bookList = books.map((book) => {
    const { name, author, publisher, year, _id } = book;
    return (
      <li key={_id}>
        <b>{name}</b>
        {listProperties(author) && ` by ${listProperties(author)}`} {publisher}{" "}
        {year}
      </li>
    );
  });

  return (
    <div className="pokeCreatorContainer">
      <p>
        Confirm that you want to invite {recipientName} from {recipientLocation}{" "}
        to browse your book collection and make him/her know that you showed
        interest in the following books in their possession:
      </p>
      <ul>{bookList.length > 0 ? bookList : "None"}</ul>
      {status}
      {status || <button onClick={handleConfirm}>Confirm</button>}
      <button onClick={handleCancel}>{status ? "Back" : "Cancel"}</button>
    </div>
  );
};

export default PokeCreator;
