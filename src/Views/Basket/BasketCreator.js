import { useState } from "react";
import { useHistory } from "react-router-dom";

import createBasket from "../../API/createBasket";
import BookListItem from "../../SharedComponents/BookListItem";

const BasketCreator = ({
  accessToken,
  recipient,
  booksOffered,
  booksRequested,
  setBasketCreatorVisible,
}) => {
  const [status, setStatus] = useState("");
  const history = useHistory();

  const handleConfirm = async () => {
    const requestedBooksId = booksRequested.map((book) => book._id);
    const offeredBooksId = booksOffered.map((book) => book._id);
    const res = await createBasket(
      accessToken,
      recipient._id,
      offeredBooksId,
      requestedBooksId
    );
    if (res.error) setStatus(res.error);
    if (res.created) setStatus("Offer successfully sent!");
    setTimeout(() => history.push("/me/basket"), 1000);
  };

  const handleCancel = () => {
    setBasketCreatorVisible(false);
  };

  const offeredBooksList = booksOffered.map((book) => (
    <BookListItem key={book._id} book={book} />
  ));

  const requestedBooksList = booksRequested.map((book) => (
    <BookListItem key={book._id} book={book} />
  ));

  return (
    <div className="creatorContainer">
      {!status && (
        <>
          <p>
            Confirm that you want to send {recipient.name} an offer to exchange
            your books:
          </p>
          <ul>{offeredBooksList}</ul>
          <p>against his/her books</p>
          <ul>{requestedBooksList}</ul>
        </>
      )}
      <p>
        <b>{status}</b>
      </p>
      {!status && <button onClick={handleConfirm}>Confirm</button>}
      {!status && <button onClick={handleCancel}>Cancel</button>}
    </div>
  );
};

export default BasketCreator;
