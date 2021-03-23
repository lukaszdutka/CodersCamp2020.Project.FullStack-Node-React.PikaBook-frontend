import { useState } from "react";
import { useHistory } from "react-router-dom"

const Registration = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [creationStatus, setCreationStatus] = useState();
  const history = useHistory();

  const handleInputChange = (e) => {
    if (e.target.id === "registerUsername")
      return setUsernameInput(e.target.value);
    if (e.target.id === "registerEmail") return setEmailInput(e.target.value);
    if (e.target.id === "registerPassword")
      return setPasswordInput(e.target.value);
    if (e.target.id === "registerLocation")
      return setLocationInput(e.target.value);
  };

  const handleSubmit = (e) => {
    setCreationStatus("Request is being sent");
    e.preventDefault();
    createAccount(usernameInput, emailInput, passwordInput, locationInput);
    setUsernameInput("");
    setEmailInput("");
    setPasswordInput("");
    setLocationInput("");
  };

  const createAccount = async (name, email, password, location) => {
    let res = await fetch("https://pikabook-api.herokuapp.com/api/users", {
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
      setCreationStatus(res);
    } else {
      res = await res.json();
      setCreationStatus("Account successfully created");
      setTimeout(() => {
        history.push("/")
      }, 2000)
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="registerUsername"
          placeholder="Name"
          value={usernameInput}
          onChange={handleInputChange}
          required
        ></input>
        <input
          type="email"
          id="registerEmail"
          placeholder="E-mail"
          value={emailInput}
          onChange={handleInputChange}
          required
        ></input>
        <input
          type="password"
          id="registerPassword"
          placeholder="Password"
          value={passwordInput}
          onChange={handleInputChange}
          required
        ></input>
        <input
          type="text"
          id="registerLocation"
          placeholder="Location"
          value={locationInput}
          onChange={handleInputChange}
        ></input>
        <input type="submit" value="Create a new account"></input>
      </form>
      <p>{creationStatus}</p>
    </div>
  );
};

export default Registration;
