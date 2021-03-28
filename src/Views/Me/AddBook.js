import React, {useState} from 'react';
import { useHistory } from "react-router-dom"

const AddBook = () => {

    const [titleInput, setTitleInput] = useState("");
    const [authorInput, setAuthorInput] = useState("");
    const [genresInput, setGeneresInput] = useState("");
    const [releaseDateInput, setReleaseDateInput] = useState("");
    const [publisherInput, setPublisherInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [creationStatus, setCreationStatus] = useState();
    const history = useHistory();

    const handleInputChange = (e) => {
        if (e.target.id === "bookTitle") return setTitleInput(e.target.value);
        if (e.target.id === "author") return setAuthorInput(e.target.value);
        if (e.target.id === "genres") return setGeneresInput(e.target.value);
        if (e.target.id === "releaseDate") return setReleaseDateInput(e.target.value);
        if (e.target.id === "publisher") return setPublisherInput(e.target.value);
        if (e.target.id === "description") return setDescriptionInput(e.target.value);
    };

    const handleSubmit = (e) => {
        console.log('Send submit ...')
        setCreationStatus("Request is being sent");
        e.preventDefault();
        addNewBook(titleInput, authorInput, genresInput, releaseDateInput, publisherInput, descriptionInput );
        setTitleInput("");
        setAuthorInput("");
        setGeneresInput("");
        setReleaseDateInput("");
        setPublisherInput("");
        setDescriptionInput("");
    };

    const addNewBook = async (title, author, genres, releaseDate, publisher, description) => {
        let res = await fetch("https://pikabook.herokuapp.com/api/books", {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            author,
            genres,
            releaseDate,
            publisher,
            description
          }),
        });
        if (!res.ok) {
          res = await res.text();
          setCreationStatus(res);
        } else {
          res = await res.json();
          setCreationStatus("Book successfully added");
          setTimeout(() => {
            history.push("/me")
          }, 2000)
        }
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
                    required
                ></input>
                <input
                    type="text"
                    id="genres"
                    placeholder="Genres"
                    value={genresInput}
                    onChange={handleInputChange}
                    required
                ></input>
                <input
                    type="text"
                    id="releaseDate"
                    placeholder="Release date"
                    value={releaseDateInput}
                    onChange={handleInputChange}
                    required
                ></input>
                <input
                    type="text"
                    id="publisher"
                    placeholder="Publisher"
                    value={publisherInput}
                    onChange={handleInputChange}
                    required
                ></input>
                <input
                    type="text"
                    id="description"
                    placeholder="Description"
                    value={descriptionInput}
                    onChange={handleInputChange}
                    required
                ></input>
                <input type="submit" value="Add"></input>
            </form>
            <p>{creationStatus}</p>
        </div>
    )
}

export default AddBook;
