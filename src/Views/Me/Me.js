import React, {useState, useEffect} from 'react'
import Book from './Book'

const Me  = ({accessToken}) => {
    const API_URL = 'https://pikabook-api.herokuapp.com/api/me/books'
    // const API_URL = 'https://pikabook-api.herokuapp.com/api/books'
    
    const [books, setBooks] = useState("");
    // const [status, setStatus] = useState("You have 0 books")

    useEffect(() => {
        fetch(API_URL, {'Authorization': 'Bearer ' + accessToken})
            .then( response => response.json())
            .then( json => json.map((book) => <Book key={book._id} data={book}/>))
            .then( bookList => setBooks(bookList))
    }, [])
    
    return ( 
        <div>
            <div>{books.length === 0 ? "You have 0 books" : books}</div>
        </div>
      );
}
 
export default Me;