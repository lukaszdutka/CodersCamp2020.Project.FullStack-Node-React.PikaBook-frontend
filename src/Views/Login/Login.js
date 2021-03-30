import { useState } from "react";
import { Link } from "react-router-dom";
import logIn from "../../API/logIn";

import "../../Assets/shared.scss";

const Login = ({ setAccessToken }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [status, setStatus] = useState();

  const handleInputChange = (e) => {
    if (e.target.id === "loginEmail") return setEmailInput(e.target.value);
    if (e.target.id === "loginPassword")
      return setPasswordInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Wait...");
    const res = await logIn(emailInput, passwordInput);
    if (res.error) setStatus(res.error);
    setEmailInput("");
    setPasswordInput("");
    if (res.accessToken) setAccessToken(res.accessToken);
  };

  return (
    <div className="logInAndRegistration">
      <form onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <input
          className="textInputDark"
          type="email"
          id="loginEmail"
          placeholder="E-mail"
          value={emailInput}
          onChange={handleInputChange}
          required
        ></input>
        <input
          className="textInputDark"
          type="password"
          id="loginPassword"
          placeholder="Password"
          value={passwordInput}
          onChange={handleInputChange}
          required
        ></input>
        <input type="submit" value="Log in" className="buttonDark"></input>
        <div>{status}</div>
        <p>
          <Link to="/registration">CREATE A NEW ACCOUNT!</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
