const updateBasketStatus = async (accessToken, basketStatus, basketId) => {
  let res = await fetch(
    `https://pikabook.herokuapp.com/api/baskets/status/${basketId}`,
    {
      method: "put",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: basketStatus }),
    }
  );

  if (!res.ok) {
    res = await res.text();

    return { error: res };
  } else {
    res = await res.json();
    return { baskets: res };
  }
};

export default updateBasketStatus;
