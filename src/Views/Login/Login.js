import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

const Login = ({ setAccessToken }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [status, setStatus] = useState();

  const handleInputChange = (e) => {
    if (e.target.id === "loginEmail") return setEmailInput(e.target.value);
    if (e.target.id === "loginPassword")
      return setPasswordInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Wait...");
    logIn(emailInput, passwordInput);
    setEmailInput("");
    setPasswordInput("");
  };

  const logIn = async (email, password) => {
    let res = await fetch("https://pikabook-api.herokuapp.com/api/auth", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      res = await res.text();
      setStatus(res);
    } else {
      res = await res.json();
      setAccessToken(res);
    }
  };

  return (
    <div className="logInContainer">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
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
      </form>
      <div>{status}</div>
      <p>
        <Link to="/registration">CREATE A NEW ACCOUNT!</Link>
      </p>
    </div>
  );
};

export default Login;
