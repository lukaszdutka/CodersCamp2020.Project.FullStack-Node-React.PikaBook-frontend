import React from 'react';


const AddBook = () => {


    return (
        <div>
            <h1>Add new book</h1>
            <form>
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
        </div>
    )
}
