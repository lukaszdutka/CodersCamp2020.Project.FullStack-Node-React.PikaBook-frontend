import React from 'react'
import DeleteBook from './DeleteBook'

 const Book = ({accessToken, data}) => {
    const {
        name,
        author,
        publisher,
        genres,
        _id
    } = data;

    const authorList = author.map((singleAuthor, index) => {
        if (index < author.length - 1) return singleAuthor + ', '; 
        return singleAuthor
    });

    const genresList = genres.map((singleGenre, index) => {
        if (index < author.length - 1) return singleGenre + ', '; 
        return singleGenre
    });


    return (
        <div>
            <div>
                <h1>{name}</h1>
                <p>{authorList}</p>
                <p>{publisher}</p>
                <p>{genresList}</p>
                <p>{_id}</p>
                <DeleteBook accessToken={accessToken} id={_id}/>
            </div>
        </div>
    )
}

export default Book;