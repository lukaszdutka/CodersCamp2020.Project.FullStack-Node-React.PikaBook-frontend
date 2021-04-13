import React, {useState} from 'react';
import { updateBook } from '../../API/updateBook'

const EditBook = ({
  accessToken,
  setEditBookVisible,
  bookData,
  getBooks
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

    const [titleInput, setTitleInput] = useState(name);
    const [authorInput, setAuthorInput] = useState(author.join(", "));
    const [genresInput, setGeneresInput] = useState(genres.join(", "));
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
        e.preventDefault();
        let authorListInput = authorInput.split(",")
        if (authorInput === "") {
            authorListInput = []
        }
        let genresListInput = genresInput.split(",")
        if (genresInput === "") {
            genresListInput = []
        }
        console.log("authorListInput: " + authorListInput[0])
        console.log("authorListInput: " + typeof authorListInput)
        const res = await updateBook(accessToken, _id, titleInput, authorListInput, genresListInput, releaseDateInput, publisherInput, descriptionInput );
        if (res.error) setStatus(res.error);
        if (res.added) setStatus("Book successfully updated")
        setTitleInput("");
        setAuthorInput("");
        setGeneresInput("");
        setReleaseDateInput("");
        setPublisherInput("");
        setDescriptionInput("");
        setEditBookVisible(false);
        getBooks(accessToken)
    };

  const handleCancel = () => {
    setEditBookVisible(false);
  };

  return (
    <div className="creatorContainer">
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
        <button onClick={handleCancel}>Cancel</button>
        <p>{status}</p>
    </div>
)
};

export default EditBook;
