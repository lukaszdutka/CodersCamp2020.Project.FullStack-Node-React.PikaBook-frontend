const searchBooks = async (url, name, location) => {
  let res = await fetch(
    url +
      new URLSearchParams({
        name,
        location,
      })
  );
  if (!res.ok) {
    res = await res.text();
    return { books: [], error: res };
  } else {
    res = await res.json();
    return { books: res };
  }
};

export default searchBooks;
