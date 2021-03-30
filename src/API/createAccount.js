export const createAccount = async (name, email, password, location) => {
  let res = await fetch("https://pikabook.herokuapp.com/api/users", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      location,
    }),
  });
  if (!res.ok) {
    res = await res.text();
    return { created: false, error: res };
  } else {
    res = await res.json();
    return { created: true };
  }
};

export default createAccount;
