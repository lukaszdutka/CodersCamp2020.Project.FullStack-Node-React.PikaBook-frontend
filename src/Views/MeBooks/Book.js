import React, {useState} from 'react'
import DeleteBook from './DeleteBook'
import EditBook from './EditBook'

 const Book = ({accessToken, data}) => {
    const {
        name,
        author,
        genres,
        year,
        publisher,
        description,
        _id
    } = data;

    const [editBookVisible, setEditBookVisible] = useState(false);

    const authorList = author.map((singleAuthor, index) => {
        if (index < author.length - 1) return singleAuthor + ', '; 
        return singleAuthor
    });

    const genresList = genres.map((singleGenre, index) => {
        if (index < author.length - 1) return singleGenre + ', '; 
        return singleGenre
    });

    const handleEditBook = async () => {
        setEditBookVisible(true);
    }

    return (
        <div>
            <div>
                <h1>{name}</h1>
                <p>{authorList}</p>
                <p>{publisher}</p>
                <p>{genresList}</p>
                <p>{year}</p>
                <p>{description}</p>
                <DeleteBook accessToken={accessToken} id={_id}/>
                <button onClick={handleEditBook}>Edit</button>
                {editBookVisible && (
                    <EditBook 
                        accessToken={accessToken} 
                        setEditBookVisible={setEditBookVisible} 
                        bookData={data}
                    />
                )}
            </div>
        </div>
    )
}

export default Book;