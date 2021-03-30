export const fetchLoggedUser = (headers) => {
  return fetchUser("https://pikabook.herokuapp.com/api/me", {}, headers);
};

export const fetchOtherUser = (id) => {
  return fetchUser(`https://pikabook.herokuapp.com/api/users/${id}`);
};

const fetchUser = async (url, headers = {}) => {
  let res = await fetch(url, {
    method: "get",
    headers
  });
  if (!res.ok) {
    res = await res.text();
    return { error: res };
  } else {
    res = await res.json();
    return { user: res };
  }
};
