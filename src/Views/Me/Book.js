import React from 'react'

 const Book = ({data}) => {
    const {
        name,
        author
    } = data;

    const authorList = author.map((singleAuthor, index) => {
        if (index < author.length - 1) return singleAuthor + ', '; 
        return singleAuthor
    });

    return (
        <div>
            <div>
                <h1>{name}</h1>
                <p>{authorList}</p>
            </div>
        </div>
    )
}

export default Book;