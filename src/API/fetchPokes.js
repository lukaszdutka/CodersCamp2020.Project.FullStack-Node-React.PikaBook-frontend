const fetchPokes = async (accessToken) => {
  let res = await fetch("https://pikabook.herokuapp.com/api/me/pokes", {
    method: "get",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    res = await res.text();
    return { error: res };
  } else {
    res = await res.json();
    return { pokes: res };
  }
};

export default fetchPokes;
