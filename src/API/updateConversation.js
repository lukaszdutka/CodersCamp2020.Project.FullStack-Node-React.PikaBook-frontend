export const updateConversation = async (accessToken, id) => {
    let res = await fetch(`https://pikabook.herokuapp.com/api/conversations/${id}`, {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      res = await res.text();
      return { error: res };
    } else {
      res = await res.json();
      return { updated: true };
    }
  };
  
  export default updateConversation;
  