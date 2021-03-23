import { useHistory } from 'react-router-dom'

const Book = ({ data }) => {
    const {
      name,
      author,
      genres,
      year,
      publisher,
      description,
      ownerId,
    } = data;
  
    const history = useHistory();
  
    const authorList = author.map((singleAuthor, index) => {
        if (index < author.length - 1) return singleAuthor + ', '; 
        return singleAuthor
    });
  
    const genreList = genres.map((genre, index) => {
      if (index < genres.length - 1) return genre + ', '; 
      return genre
  });
  
    const handleOnClick = () => {
      history.push(`/user/${ownerId._id}`)    
    }
  
    return (
      <div>
        <div className="bookData">
          <h1>{name}</h1>
          <p>{authorList}</p>
          <p>{genreList}</p>
          <p>{publisher}</p>
          <p>{year}</p>
          <p>{description}</p>
        </div>
        <div className="userData">
          <p>{ownerId.name}</p>
          <p>{ownerId.location}</p>
        </div>
        <input type='button' value="User's profile" onClick={handleOnClick}></input>
      </div>
    );
  };

  export default Book