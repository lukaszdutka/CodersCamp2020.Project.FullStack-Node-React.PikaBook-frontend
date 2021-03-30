import React, {useState} from 'react'
import Book from './Book'
import AddBook from './AddBook'
import { searchMyBooks } from "../../API/fetchBooks";

const Me  = (accessToken) => {
    const [books, setBooks] = useState([]);

    const fetchMyBooks = async () => {
        let res = await searchMyBooks({
          headers: {'Authorization': 'Bearer ' + accessToken.token}
        })
        // let res = await fetch('https://pikabook.herokuapp.com/api/me/books',  {
        //   headers: {
        //     'Authorization': 'Bearer ' + accessToken.token
        //   }
        // });
        if (!res.ok) {
          res = await res.text();
          //do some stuff
          setBooks([])
        } else {
          res = await res.json();
          setBooks(res)
        }
      };
    const bookList = books.map((book) => <Book key={book._id} data={book} />);

    return ( 
        <div>
            <div onLoad={fetchMyBooks} >{bookList.length === 0 ? "You have 0 books" : bookList}</div>
            <div><AddBook></AddBook></div>
        </div>
      );
}
 
export default Me;