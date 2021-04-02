export const updatePoke = async (accessToken, id) => {
    let res = await fetch(`https://pikabook.herokuapp.com/api/pokes/${id}`, {
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
  
  export default updatePoke;
  