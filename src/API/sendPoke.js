export const sendPoke = async (accessToken, recipient, books) => {
  let res = await fetch("https://pikabook.herokuapp.com/api/pokes", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      recipient,
      books,
    }),
  });
  if (!res.ok) {
    res = await res.text();
    return { error: res };
  } else {
    res = await res.json();
    return { created: true };
  }
};

export default sendPoke;
