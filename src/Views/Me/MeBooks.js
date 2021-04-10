import React, {useState, useEffect} from 'react'
import Book from './Book'
import AddBook from './AddBook'
import { searchMyBooks } from '../../API/fetchBooks';

const MeBooks  = ({accessToken}) => {
    const [myBooks, setMyBooks] = useState([]);
    const [status, setStatus] = useState("My books loading ...");

    // const handleLoad = async (e) => {
    //   e.preventDefault();
    //   setStatus("Searching...");
    //   const res = await searchMyBooks(accessToken)
    //   console.log("RES" + res)
    //   if (res.error) setStatus(res.error);
    //   setBooks(res.books);
    //   if (books.length === 0) setStatus("No books found");
    // };

    useEffect(() => {
      const getBooks = async () => {
        const res = await searchMyBooks(accessToken);
        if (res.error) console.log(res.error);
        if (res.books) setMyBooks(res.books);
      };
      getBooks();
    }, [accessToken]);

    const bookList = myBooks.map((book) => <Book key={book._id} data={book} />);

    return ( 
        <div>
            {/* <div onLoad={handleLoad} >{bookList.length === 0 ? status : bookList}</div> */}
            {bookList}
            <div><AddBook></AddBook></div>
        </div>
      );
}
 
export default MeBooks;