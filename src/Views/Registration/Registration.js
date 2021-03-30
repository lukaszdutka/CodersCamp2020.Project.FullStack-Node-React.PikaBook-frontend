import { useState } from "react";
import { useHistory } from "react-router-dom";

import "../../Assets/shared.scss";

import createAccount from "../../API/createAccount"

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

  const handleSubmit = async (e) => {
    setCreationStatus("Request is being sent");
    e.preventDefault();
    const res = await createAccount(
      usernameInput,
      emailInput,
      passwordInput,
      locationInput
    );
    res.error
      ? setCreationStatus(res.error)
      : setCreationStatus("Account successfully created");
    setUsernameInput("");
    setEmailInput("");
    setPasswordInput("");
    setLocationInput("");
    if (res.created) {
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  };

  return (
    <div className="logInAndRegistration"> 
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type="text"
          className="textInputDark"
          id="registerUsername"
          placeholder="Name"
          value={usernameInput}
          onChange={handleInputChange}
          required
        ></input>
        <input
          type="email"
          className="textInputDark"
          id="registerEmail"
          placeholder="E-mail"
          value={emailInput}
          onChange={handleInputChange}
          required
        ></input>
        <input
          type="password"
          className="textInputDark"
          id="registerPassword"
          placeholder="Password"
          value={passwordInput}
          onChange={handleInputChange}
          required
        ></input>
        <input
          type="text"
          className="textInputDark"
          id="registerLocation"
          placeholder="Location"
          value={locationInput}
          onChange={handleInputChange}
        ></input>
        <input
          type="submit"
          value="Create a new account"
          className="buttonDark"
        ></input>
        <p>{creationStatus}</p>
      </form>
    </div>
  );
};

export default Registration;
