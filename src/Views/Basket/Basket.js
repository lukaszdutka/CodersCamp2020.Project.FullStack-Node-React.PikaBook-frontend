import { useLocation } from "react-router-dom";

const CreateBasket = ({ accessToken }) => {
  const location = useLocation();
  const chosenBooks = location.state.chosenBooks;
  const recipient = location.state.id;

  const chosenBooksList = chosenBooks.map((book) => <p key={book._id}>{book.name}</p>);

  return (
    <div>
      sender {accessToken}, recipient {recipient}, {chosenBooksList}
    </div>
  );
};

export default CreateBasket;
