export const searchAllBooks = (params) => {
  return searchBooks("https://pikabook.herokuapp.com/api/books?", params);
};

export const searchMyBooks = (headers) => {
  return searchBooks(
    "https://pikabook.herokuapp.com/api/me/books",
    {},
    headers
  );
};

export const searchUsersBooks = (id) => {
  return searchBooks(`https://pikabook.herokuapp.com/api/users/${id}/books`);
};

export const searchOneBook = async (id) => {
  let res = await fetch(`https://pikabook.herokuapp.com/api/books/${id}`);
  if (!res.ok) {
    res = await res.text();
    return { error: res };
  } else {
    res = await res.json();
    return { book: res };
  }
}

const searchBooks = async (url, params = {}, headers = {}) => {
  let res = await fetch(url + new URLSearchParams(params), {
    method: "get",
    headers,
  });
  if (!res.ok) {
    res = await res.text();
    return { books: [], error: res };
  } else {
    res = await res.json();
    return { books: res };
  }
};
