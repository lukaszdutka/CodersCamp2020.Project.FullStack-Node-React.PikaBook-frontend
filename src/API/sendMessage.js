export const sendMessage = async (accessToken, recipient, content) => {
  let res = await fetch("https://pikabook.herokuapp.com/api/conversations", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      recipient,
      content,
    }),
  });
  if (!res.ok) {
    res = await res.text();
    return { created: false, error: res };
  } else {
    res = await res.json();
    return { created: true, message: res.content };
  }
};

export default sendMessage;
