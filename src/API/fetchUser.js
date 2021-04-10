export const fetchLoggedUser = (accessToken) => {
  return fetchUser("https://pikabook.herokuapp.com/api/me", accessToken);
};

export const fetchOtherUser = (id) => {
  return fetchUser(`https://pikabook.herokuapp.com/api/users/${id}`);
};

const fetchUser = async (url, accessToken) => {
  let res = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (!res.ok) {
    res = await res.text();
    return { error: res };
  } else {
    res = await res.json();
    return { user: res };
  }
};
