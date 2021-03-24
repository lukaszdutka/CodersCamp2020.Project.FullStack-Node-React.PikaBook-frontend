import React, {useState, useEffect} from 'react'
import Book from './Book'

const Me  = ({accessToken}) => {
    const API_URL = 'https://pikabook-api.herokuapp.com/api/me/books'
    // const API_URL = 'https://pikabook-api.herokuapp.com/api/books'
    console.log('Access Token: ' + accessToken)
    const [books, setBooks] = useState("");
    // const [status, setStatus] = useState("You have 0 books")

    useEffect(() => {
        fetch(API_URL, {
            'Authorization': 'Bearer ' + accessToken})
        .then( response => response.json())
        .then( fetchedBooks => setBooks(fetchedBooks))
    }, [accessToken])
    const bookList = books.map((book) => <Book key={book._id} data={book} />);
    console.log('Books: ' + bookList)
    return ( 
        <div>
            <div>{bookList.length === 0 ? "You have 0 books" : bookList}</div>
        </div>
      );
}
 
export default Me;