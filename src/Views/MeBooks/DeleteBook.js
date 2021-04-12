import React, {useState} from 'react';
import { deleteBook } from '../../API/deleteBook'

const DeleteBook = ({accessToken, id, getBooks}) => {

    const [status, setStatus] = useState();

    const handleRemoval = async (e) => {
        setStatus("Request is being sent");
        e.preventDefault();
        const res = await deleteBook(accessToken, id);
        if (res.error) setStatus(res.error);
        if (res.deleted) {
            setStatus("Book deleted")
        }
        getBooks(accessToken);
    };
  
    return (
        <div>
            <button onClick={handleRemoval}>Delete</button>
            <p>{status}</p>
        </div>
    )
}

export default DeleteBook;
