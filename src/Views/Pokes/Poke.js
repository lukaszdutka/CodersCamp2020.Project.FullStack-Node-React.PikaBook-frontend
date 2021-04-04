import { useHistory } from "react-router-dom";

import BookListItem from "../../SharedComponents/BookListItem";

const PokeReceived = ({ bookList, creationDate, sender, read, handleOnClick }) => {
  return (
    <div className={!read && "newPoke"}>
      {bookList.length > 0 ? (
        <>
          <p>
            On {creationDate} <b>{sender.name}</b> showed interest in the
            following books in your collection:
          </p>
          <ul>{bookList}</ul>
          <p>and invited you to browse his/hers collection.</p>{" "}
        </>
      ) : (
        <p>
          On {creationDate} <b>{sender.name}</b> showed interest in your
          collection and invited you to browse his/hers collection
        </p>
      )}
      <button onClick={handleOnClick}>
        Visit <b>{sender.name}</b>'s profile
      </button>
    </div>
  );
};

const PokeSent = ({
  bookList,
  creationDate,
  recipient,
  handleOnClick,
}) => {
  return (
    <div>
      {bookList.length > 0 ? (
        <>
          <p>
            On {creationDate} you showed interest in the following books in{" "}
            <b>{recipient.name}</b>'s collection:
          </p>
          <ul>{bookList}</ul>
          <p>and invited him/her to browse your collection.</p>{" "}
        </>
      ) : (
        <p>
          On {creationDate} you showed interest in <b>{recipient.name}</b>'s'
          collection and invited you him/her browse your collection.
        </p>
      )}
      <button onClick={handleOnClick}>
        Visit <b>{recipient.name}</b>'s profile
      </button>
    </div>
  );
};

const Poke = ({ poke: { sender, recipient, books, date, read }, type }) => {
  const history = useHistory();
  const creationDate = new Date(date).toLocaleString();

  const handleOnClick = () => {
    if (type === 'offered') history.push(`/user/${sender._id}`, { bookId: "" });
    if (type === 'sent') history.push(`/user/${recipient._id}`, { bookId: "" });
  };

  const bookList = books.map((book) => (
    <BookListItem key={book._id} book={book} />
  ));

  return (
    <div>
      {type === "received" && (
        <PokeReceived
          bookList={bookList}
          creationDate={creationDate}
          sender={sender}
          read={read}
          handleOnClick={handleOnClick}
        />
      )}
      {type === "sent" && (
        <PokeSent
          bookList={bookList}
          creationDate={creationDate}
          recipient={recipient}
          handleOnClick={handleOnClick}
        />
      )}
    </div>
  );
};

export default Poke;
