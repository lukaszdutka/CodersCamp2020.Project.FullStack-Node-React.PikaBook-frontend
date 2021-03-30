const logIn = async (email, password) => {
  let res = await fetch("https://pikabook.herokuapp.com/api/auth", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    res = await res.text();
    return { error: res };
  } else {
    res = await res.json();
    return { accessToken: res.token };
  }
};

export default logIn;
