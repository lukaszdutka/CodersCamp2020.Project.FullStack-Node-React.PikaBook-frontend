import React, {useState} from 'react';
import { updateBook } from '../../API/updateBook'

const EditBook = ({
  accessToken,
  setEditBookVisible,
  bookData
}) => {

    const {
        name,
        author,
        genres,
        year,
        publisher,
        description,
        _id
    } = bookData;

    const authorList = author.map((singleAuthor, index) => {
        if (index < author.length - 1) return singleAuthor + ', '; 
        return singleAuthor
    });

    const genresList = genres.map((singleGenre, index) => {
        if (index < author.length - 1) return singleGenre + ', '; 
        return singleGenre
    });

    const [titleInput, setTitleInput] = useState(name);
    const [authorInput, setAuthorInput] = useState(authorList);
    const [genresInput, setGeneresInput] = useState(genresList);
    const [releaseDateInput, setReleaseDateInput] = useState(year);
    const [publisherInput, setPublisherInput] = useState(publisher);
    const [descriptionInput, setDescriptionInput] = useState(description);
    const [status, setStatus] = useState("");

    const handleInputChange = (e) => {
        if (e.target.id === "bookTitle") return setTitleInput(e.target.value);
        if (e.target.id === "author") return setAuthorInput(e.target.value);
        if (e.target.id === "genres") return setGeneresInput(e.target.value);
        if (e.target.id === "releaseDate") return setReleaseDateInput(e.target.value);
        if (e.target.id === "publisher") return setPublisherInput(e.target.value);
        if (e.target.id === "description") return setDescriptionInput(e.target.value);
    };

    const handleUpdate = async (e) => {
        console.log('Send updated book ...')
        console.log('Author input: ' + typeof authorInput)
        setStatus("Request is being sent");
        e.preventDefault();
        let bookName = authorInput;
        if (Array.isArray(authorInput)) {
            bookName = authorInput.join(",")
        }
        let autorListInput = bookName.split(",")
        if (authorInput === "") {
            autorListInput = []
        }
        let genresName = genresInput;
        if (Array.isArray(genresInput)) {
            genresName = genresInput.join(",")
        }
        let genresListInput = genresName.split(",")
        if (genresInput === "") {
            genresListInput = []
        }
        const res = await updateBook(accessToken, _id, titleInput, autorListInput, genresListInput, releaseDateInput, publisherInput, descriptionInput );
        if (res.error) setStatus(res.error);
        if (res.added) setStatus("Book successfully updated")
        setTitleInput("");
        setAuthorInput("");
        setGeneresInput("");
        setReleaseDateInput("");
        setPublisherInput("");
        setDescriptionInput("");
    };

  const handleCancel = () => {
    setEditBookVisible(false);
  };

  return (
    <div className="editContainer">
        {!status && (
            <>
                <h1>Edit book</h1>
                <form onSubmit={handleUpdate}>
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
                    <input type="submit" value="Update"></input>
                </form>
            </>
        )}
        
        <button onClick={handleCancel}>{status ? "Back" : "Cancel"}</button>
        <p>{status}</p>
    </div>
)
};

export default EditBook;
