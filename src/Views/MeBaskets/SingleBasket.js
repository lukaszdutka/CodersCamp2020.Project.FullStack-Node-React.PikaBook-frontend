import Book from "../../SharedComponents/Book";

import Buttons from "./Buttons";

const SingleBasket = ({
  basket: {
    _id,
    booksOffered,
    booksRequested,
    status,
    read,
    createdByUserId,
    targetUserID,
    timeCreated,
  },
  loggedUser,
  accessToken,
  getLoggedUsersBaskets,
  basketsInterval
}) => {
  const isUserRequestor = createdByUserId._id === loggedUser._id;
  const timeOfCreation = new Date(timeCreated).toLocaleString();
  const coOwner = isUserRequestor ? targetUserID : createdByUserId;
  const myBooks = isUserRequestor ? booksOffered : booksRequested;
  const coOwnersBooks = isUserRequestor ? booksRequested : booksOffered;
  const myBooksList = myBooks.map((book) => (
    <Book key={book._id} book={book} />
  ));
  const coOwnersBooksList = coOwnersBooks.map((book) => (
    <Book key={book._id} book={book} />
  ));
  return (
    <div>
      <div>
        <p>Time of creation: {timeOfCreation}</p>
        <p>Status: {status}</p>
        <p>Co-owner of the basket: {coOwner.name}</p>
      </div>
      <div>
        <div>My Books</div>
        {myBooksList}
      </div>
      <div>
        <div>{coOwner.name}'s books</div>
        {coOwnersBooksList}
      </div>
      <Buttons
        accessToken={accessToken}
        status={status}
        _id={_id}
        isUserRequestor={isUserRequestor}
        coOwnerName={coOwner.name}
        getLoggedUsersBaskets={getLoggedUsersBaskets}
        basketsInterval={basketsInterval}
      />
    </div>
  );
};

export default SingleBasket;
