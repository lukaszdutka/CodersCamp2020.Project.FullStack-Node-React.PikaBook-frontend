import listProperties from "../SharedFunctions/listProperties";

const BookListItem = ( { book: { name, author, publisher, year, _id } }) => {
    return (
      <li key={_id}>
        <b>{name}</b>
        {author.length > 0 && ` by ${listProperties(author)}`} {publisher}{" "}
        {year}
      </li>
    );
}
 
export default BookListItem;
