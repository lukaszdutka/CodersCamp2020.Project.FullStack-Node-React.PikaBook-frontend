import React, {useState} from 'react';
import { deleteBook } from '../../API/deleteBook'
import { useHistory } from "react-router-dom"

const DeleteBook = ({accessToken, id}) => {

    const [status, setStatus] = useState();
    const history = useHistory();

    const handleRemoval = async (e) => {
        setStatus("Request is being sent");
        e.preventDefault();
        const res = await deleteBook(accessToken, id);
        if (res.error) setStatus(res.error);
        if (res.deleted) {
            setStatus("Book deleted")
            setTimeout(() => {
                history.push("/");
              }, 2000);
        }
    };
  
    return (
        <div>
            <button onClick={handleRemoval}>Delete</button>
            <p>{status}</p>
        </div>
    )
}

export default DeleteBook;
