import React, {useState} from 'react'
import Book from './Book'
import AddBook from './AddBook'
import { searchMyBooks } from '../../API/fetchBooks';

const Me  = (accessToken) => {
    const [books, setBooks] = useState([]);
    const [status, setStatus] = useState("My books loading ...");

    const handleLoad = async (e) => {
      e.preventDefault();
      setStatus("Searching...");
      const res = await searchMyBooks({
        'Authorization': 'Bearer ' + accessToken.token
      })
      if (res.error) setStatus(res.error);
      setBooks(res.books);
      if (books.length === 0) setStatus("No books found");
    };

    const bookList = books.map((book) => <Book key={book._id} data={book} />);

    return ( 
        <div>
            <div onLoad={handleLoad} >{bookList.length === 0 ? status : bookList}</div>
            <div><AddBook></AddBook></div>
        </div>
      );
}
 
export default Me;