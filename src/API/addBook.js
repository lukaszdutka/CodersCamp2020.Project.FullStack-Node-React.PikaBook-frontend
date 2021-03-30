export const addBook = async (accessToken, title, author, genres, releaseDate, publisher, description) => {
    let res = await fetch("https://pikabook.herokuapp.com/api/books", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + accessToken
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
      return { added: false, error: res };
    //   setCreationStatus(res);
    } else {
      res = await res.json();
      return { added: true };
    //   setCreationStatus("Book successfully added");
    //   setTimeout(() => {
    //     history.push("/me")
    //   }, 2000)
    }
};