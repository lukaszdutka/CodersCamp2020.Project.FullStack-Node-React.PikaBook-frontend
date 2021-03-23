import React, {useState, useEffect} from 'react'
import Book from './Book'

const Me  = () => {
    const API_URL = 'https://pikabook-api.herokuapp.com/api/me/books'
    
    const [books, setBooks] = useState("");
    // const [status, setStatus] = useState("You have 0 books")

    useEffect(() => {
        loadMyBooks();
    }, [])

    const loadMyBooks = async() => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setBooks(data)
        console.log(data)
    }

    const bookList = books.map((book) => <Book key={book._id} data={book}/>)
    return ( 
        <div>
            <div>{bookList.length === 0 ? "You have 0 books" : bookList}</div>
        </div>
      );
}
 
export default Me;