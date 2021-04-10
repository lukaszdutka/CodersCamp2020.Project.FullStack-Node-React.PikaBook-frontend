import React from 'react'

 const Book = ({data}) => {
    const {
        name,
        author,
        publisher,
        genres
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
            </div>
        </div>
    )
}

export default Book;