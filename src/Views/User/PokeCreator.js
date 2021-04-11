import { useState } from "react";

import BookListItem from "../../SharedComponents/BookListItem";
import sendPoke from "../../API/sendPoke";

const PokeCreator = ({
  accessToken,
  books,
  recipient,
  setPokeCreatorVisible,
}) => {
  const [status, setStatus] = useState("");

  const handleConfirm = async () => {
    const booksId = books.map((book) => book._id);
    const res = await sendPoke(accessToken, recipient._id, booksId);
    if (res.error) setStatus(res.error);
    if (res.created) setStatus("Poke successfully sent!");
  };

  const handleCancel = () => {
    setPokeCreatorVisible(false);
  };

  const bookList = books.map((book) => (
    <BookListItem key={book._id} book={book} />
  ));

  return (
    <div className="creatorContainer" id="pokeCreator">
      {!status && (
        <>
          <p>
            Invite {<b>{recipient.name}</b>} to browse your book collection and make
            him/her know that you showed interest in the following books in
            their possession:
          </p>
          <ul>{bookList.length > 0 ? bookList : "None"}</ul>
        </>
      )}
      {status && (
        <p>
          <b>status</b>
        </p>
      )}
      <div>
        {!status && (
          <button className="buttonDark" onClick={handleConfirm}>
            Confirm
          </button>
        )}
        <button className="buttonDark" onClick={handleCancel}>
          {status ? "Back" : "Cancel"}
        </button>
      </div>
    </div>
  );
};

export default PokeCreator;
