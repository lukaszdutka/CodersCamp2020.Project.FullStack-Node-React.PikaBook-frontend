import Book from "../../SharedComponents/Book";

import Buttons from "./Buttons";

const SingleBasket = ({
  basket: {
    _id,
    booksOffered,
    booksRequested,
    status,
    createdByUserId,
    targetUserID,
    timeCreated,
  },
  loggedUser,
  accessToken,
  getLoggedUsersBaskets,
  basketsInterval,
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
  const inActiveState = [
    "cancelled",
    "rejected",
    "failedByRequestor",
    "failedByTarget",
    "success",
  ];

  const getStatus = () => {
    switch (status) {
      case "failedByRequestor":
        return "failed by requestor";
      case "failedByTarget":
        return "failed by target";
      case "successByRequestor":
        return "success by requestor";
      case "successByTarget":
        return "success by target";
      default:
        return status;
    }
  };
  return (
    <div
      className={
        inActiveState.includes(status)
          ? "singleBasket endedBasket"
          : "singleBasket"
      }
    >
      <div className="basketData">
        <p>
          <b>Time of creation: </b>
          {timeOfCreation}
        </p>
        <p>
          <b>Status: </b>
          {getStatus()}
        </p>
        <p>
          <b>Co-owner of the basket: </b>
          {coOwner.name}
        </p>
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
      <div className="basketBooks">
        <h1 className="booksHeading">My Books</h1>
        {myBooksList}
      </div>
      <div className="basketBooks">
        <h1 className="booksHeading">{coOwner.name}'s books</h1>
        {coOwnersBooksList}
      </div>
    </div>
  );
};

export default SingleBasket;
