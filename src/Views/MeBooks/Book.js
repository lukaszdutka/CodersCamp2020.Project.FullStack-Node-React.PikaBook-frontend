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

    const handleEditBook = async () => {
        setEditBookVisible(true);
    }

    return (
        <div className="bookContainer">
            <div className="bookInfo">
                <p className="bookTitle">
                    <b>{name}</b>
                </p>
                {author.length > 0 && (
                    <p className="author">
                        <b>Author:</b> {listProperties(author)}
                    </p>
                )}
                {publisher && (
                    <p className="publisher">
                        <b>Publisher:</b> {publisher}
                    </p>
                )}
                {year && (
                    <p className="year">
                        <b>Publication year:</b> {year}
                    </p>
                )}
                {genres.length > 0 && (
                    <p className="genres">
                        <b>Genre:</b> {listProperties(genres)}
                    </p>
                )}
                {description && (
                    <p className="description">
                        <b>Description:</b> {description}
                    </p>
                )}
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