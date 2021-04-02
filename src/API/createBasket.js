export const createBasket = async (
  accessToken,
  targetUserID,
  booksOffered,
  booksRequested
) => {
  let res = await fetch("https://pikabook.herokuapp.com/api/baskets", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      targetUserID,
      booksOffered,
      booksRequested,
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

export default createBasket;
