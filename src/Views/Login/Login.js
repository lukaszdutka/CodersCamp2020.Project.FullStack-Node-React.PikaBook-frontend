import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setAccessToken }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState();

  const handleInputChange = (e) => {
    if (e.target.id === "loginEmail") return setEmailInput(e.target.value);
    if (e.target.id === "loginPassword")
      return setPasswordInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      setError(res);
    } else {
      res = await res.json();
      setAccessToken(res);
    }
  };

  return (
    <div>
      <h1>Welcome to Pikabook!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="loginEmail"
          placeholder="e-mail"
          value={emailInput}
          onChange={handleInputChange}
          required
        ></input>
        <input
          type="password"
          id="loginPassword"
          placeholder="password"
          value={passwordInput}
          onChange={handleInputChange}
          required
        ></input>
        <input type="submit" value="Log in"></input>
      </form>
      <p>{error}</p>
      <p>
        <Link to="/registration">Create a new account</Link>
      </p>
    </div>
  );
};

export default Login;
