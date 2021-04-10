import React, {useState} from 'react';
import { addBook } from '../../API/addBook'
import { useHistory } from "react-router-dom"

const AddBook = ({accessToken}) => {

    const [titleInput, setTitleInput] = useState("");
    const [authorInput, setAuthorInput] = useState("");
    const [genresInput, setGeneresInput] = useState("");
    const [releaseDateInput, setReleaseDateInput] = useState("");
    const [publisherInput, setPublisherInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [status, setStatus] = useState();
    const history = useHistory();

    const handleInputChange = (e) => {
        if (e.target.id === "bookTitle") return setTitleInput(e.target.value);
        if (e.target.id === "author") return setAuthorInput(e.target.value);
        if (e.target.id === "genres") return setGeneresInput(e.target.value);
        if (e.target.id === "releaseDate") return setReleaseDateInput(e.target.value);
        if (e.target.id === "publisher") return setPublisherInput(e.target.value);
        if (e.target.id === "description") return setDescriptionInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        console.log('Send submit ...')
        setStatus("Request is being sent");
        e.preventDefault();
        let autorListInput = authorInput.split(",")
        if (authorInput === "") {
            autorListInput = []
        }
        let genresListInput = genresInput.split(",")
        if (genresInput === "") {
            genresListInput = []
        }
        const res = await addBook(accessToken, titleInput, autorListInput, genresListInput, releaseDateInput, publisherInput, descriptionInput );
        if (res.error) setStatus(res.error);
        if (res.added) {
            setStatus("Book successfully added")
            setTimeout(() => {
                history.push("/");
              }, 2000);
        }
        setTitleInput("");
        setAuthorInput("");
        setGeneresInput("");
        setReleaseDateInput("");
        setPublisherInput("");
        setDescriptionInput("");
    };
  
    return (
        <div>
            <h1>Add new book</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="bookTitle"
                    placeholder="Book's title"
                    value={titleInput}
                    onChange={handleInputChange}
                    required
                ></input>
                <input
                    type="text"
                    id="author"
                    placeholder="Author"
                    value={authorInput}
                    onChange={handleInputChange}
                ></input>
                <input
                    type="text"
                    id="genres"
                    placeholder="Genres"
                    value={genresInput}
                    onChange={handleInputChange}
                ></input>
                <input
                    type="text"
                    id="releaseDate"
                    placeholder="Release date"
                    value={releaseDateInput}
                    onChange={handleInputChange}
                ></input>
                <input
                    type="text"
                    id="publisher"
                    placeholder="Publisher"
                    value={publisherInput}
                    onChange={handleInputChange}
                ></input>
                <input
                    type="text"
                    id="description"
                    placeholder="Description"
                    value={descriptionInput}
                    onChange={handleInputChange}
                ></input>
                <input type="submit" value="Add"></input>
            </form>
            <p>{status}</p>
        </div>
    )
}

export default AddBook;
