import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setAccessToken }) => {

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState();

  const handleInputChange = (e) => {
    if (e.target.id === "loginEmail") return setEmailInput(e.target.value);
    if (e.target.id === "loginPassword") return setPasswordInput(e.target.value);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(emailInput, passwordInput);
    localStorage.setItem('token', emailInput)
    setEmailInput("");
    setPasswordInput("");
  };

  const logIn = (email, password) => {
    fetch("https://pikabook-api.herokuapp.com/api/auth", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => {
        if (res.ok) return res
        throw new Error(res)
      }) 
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <div>
      <h1>Welcome to Pikabook!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="loginEmail">E-mail:</label>
        <input
          type="text"
          id="loginEmail"
          value={emailInput}
          onChange={handleInputChange}
          required
        ></input>
        <label htmlFor="loginPassword">Password:</label>
        <input
          type="password"
          id="loginPassword"
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
