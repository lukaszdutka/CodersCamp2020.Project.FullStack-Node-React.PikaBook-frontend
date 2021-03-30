import { useState } from "react";
import { Link } from "react-router-dom";
import logIn from "../../API/logIn";

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
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="loginEmail"
          placeholder="E-mail"
          value={emailInput}
          onChange={handleInputChange}
          required
        ></input>
        <input
          type="password"
          id="loginPassword"
          placeholder="Password"
          value={passwordInput}
          onChange={handleInputChange}
          required
        ></input>
        <input type="submit" value="Log in"></input>
      </form>
      <div>{status}</div>
      <p>
        <Link to="/registration">CREATE A NEW ACCOUNT!</Link>
      </p>
    </div>
  );
};

export default Login;
