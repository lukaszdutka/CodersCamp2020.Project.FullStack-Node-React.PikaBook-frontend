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
    <div className="creatorContainer">
      {!status && (
        <>
          <p>
            Confirm that you want to invite {recipient.name} to browse your book
            collection and make him/her know that you showed interest in the
            following books in their possession:
          </p>
          <ul>{bookList.length > 0 ? bookList : "None"}</ul>
        </>
      )}
      <p>
        <b>{status}</b>
      </p>
      {!status && <button onClick={handleConfirm}>Confirm</button>}
      <button onClick={handleCancel}>{status ? "Back" : "Cancel"}</button>
    </div>
  );
};

export default PokeCreator;
