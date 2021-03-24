import React, {useState} from 'react'
import Book from './Book'

const Me  = (accessToken) => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        let res = await fetch('https://pikabook.herokuapp.com/api/me/books',  {
          headers: {
            'Authorization': 'Bearer ' + accessToken.token
          }
        });
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
        <div onLoad={fetchBooks}>
            <div>{bookList.length === 0 ? "You have 0 books" : bookList}</div>
        </div>
      );
}
 
export default Me;