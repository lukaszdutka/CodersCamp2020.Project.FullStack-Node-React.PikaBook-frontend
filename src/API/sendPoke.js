export const sendPoke = async (accessToken, recipient, books) => {
    let res = await fetch("https://pikabook.herokuapp.com/api/pokes", {
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        recipient, 
        books
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
  
  export default sendPoke;
  