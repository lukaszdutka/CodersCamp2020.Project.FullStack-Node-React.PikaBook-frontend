import React, {useState} from 'react'
import DeleteBook from './DeleteBook'
import EditBook from './EditBook'
import listProperties from '../../SharedFunctions/listProperties'

 const Book = ({accessToken, data, getBooks}) => {
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

    const authorList = listProperties(author)
    const genresList = listProperties(genres)

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
                <DeleteBook 
                    accessToken={accessToken} 
                    id={_id}
                    getBooks={getBooks}
                />
                <button onClick={handleEditBook}>Edit</button>
                {editBookVisible && (
                    <EditBook 
                        accessToken={accessToken} 
                        setEditBookVisible={setEditBookVisible} 
                        bookData={data}
                        getBooks={getBooks}
                    />
                )}
            </div>
        </div>
    )
}

export default Book;