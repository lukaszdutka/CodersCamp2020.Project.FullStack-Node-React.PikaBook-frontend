import { useState } from "react";

const Registration = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState();

  const handleInputChange = (e) => {
    if (e.target.id === "registerUsername")
      return setUsernameInput(e.target.value);
    if (e.target.id === "registerEmail") return setEmailInput(e.target.value);
    if (e.target.id === "registerPassword")
      return setPasswordInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount(emailInput, passwordInput);
    setUsernameInput("");
    setEmailInput("");
    setPasswordInput("");
  };

  const createAccount = (username, email, password) => {
    fetch("https://pikabook-api.herokuapp.com/api/users", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
    .then((res) => {
        if (res.ok) return res
        setError(res)
        throw new Error(res)
      }) 
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <div>
      <h1>User registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="registerUsername">Username:</label>
        <input
          type="text"
          id="registerUsername"
          value={usernameInput}
          onChange={handleInputChange}
          required
        ></input>
        <label htmlFor="registerEmail">E-mail:</label>
        <input
          type="text"
          id="registerEmail"
          value={emailInput}
          onChange={handleInputChange}
          required
        ></input>
        <label htmlFor="registerPassword">Password:</label>
        <input
          type="password"
          id="registerPassword"
          value={passwordInput}
          onChange={handleInputChange}
          required
        ></input>
        <input type="submit" value="Create a new account"></input>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Registration;
