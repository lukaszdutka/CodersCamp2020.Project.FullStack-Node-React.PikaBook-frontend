export const addBook = async (
  accessToken, 
  name, 
  author, 
  genres, 
  year, 
  publisher, 
  description
  ) => {
    const bookBody = {}
    bookBody.name = name
    if (author.length !== 0) { bookBody.author = author }
    if (genres.length !== 0) { bookBody.genres = genres }
    if (year) { bookBody.year = year }
    if (publisher) { bookBody.publisher = publisher }
    if (description) { bookBody.description = description }

    console.log(bookBody)

    let res = await fetch("https://pikabook.herokuapp.com/api/books", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(bookBody),
    });
    if (!res.ok) {
      res = await res.text();
      return { added: false, error: res };
    } else {
      res = await res.json();
      return { added: true };
    }
};