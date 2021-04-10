import React, {useState, useEffect} from 'react'
import Book from './Book'
import AddBook from './AddBook'
import { searchMyBooks } from '../../API/fetchBooks';

const MeBooks  = ({accessToken}) => {
    const [myBooks, setMyBooks] = useState([]);
    const [status, setStatus] = useState("My books loading ...");

    useEffect(() => {
      const getBooks = async () => {
        const res = await searchMyBooks(accessToken);
        if (res.error) {
          console.log(res.error);
          setStatus("No books found.")
        }
        if (res.books) {
          setMyBooks(res.books);
        }
      };
      getBooks();
    }, [accessToken]);

    const bookList = myBooks.map((book) => <Book key={book._id} data={book} />);

    return ( 
        <div>
            <div >{bookList.length === 0 ? status : bookList}</div>
            <div><AddBook accessToken={accessToken}></AddBook></div>
        </div>
      );
}
 
export default MeBooks;