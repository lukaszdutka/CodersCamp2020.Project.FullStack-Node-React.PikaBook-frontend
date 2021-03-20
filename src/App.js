import "./App.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";

import Header from "./Layout/Header/Header";
import Nav from "./Layout/Nav/Nav";
import Footer from "./Layout/Footer/Footer";
import Login from "./Views/Login/Login";
import Registartion from "./Views/Registration/Registration";
import Search from "./Views/Search/Search";
import User from "./Views/User/User";
import Me from "./Views/Me/Me";
import Basket from "./Views/Basket/Basket";
import Error from "./Views/Error";

function App() {
  const [accessToken, setAccessToken] = useState("");

  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <main>
        <Switch>
          <Route
            path="/"
            exact
            render={() =>
              accessToken ? (
                <Redirect to="/search" />
              ) : (
                <Login
                  setAccessToken={setAccessToken}
                  accessToken={accessToken}
                />
              )
            }
          ></Route>
          <Route
            path="/registration"
            render={() =>
              accessToken ? (
                <Redirect to="/search" />
              ) : (
                <Registartion setAccessToken={setAccessToken} />
              )
            }
          ></Route>
          <Route
            path="/search"
            exact
            render={() =>
              accessToken ? (
                <Search accessToken={accessToken} />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route>
          <Route
            path="/user/:id"
            exact
            render={() =>
              accessToken ? (
                <User accessToken={accessToken} />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route>
          <Route
            path="/user/:id/basket"
            render={() =>
              accessToken ? (
                <Basket accessToken={accessToken} />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route>
          <Route
            path="/me"
            render={() =>
              accessToken ? (
                <Me accessToken={accessToken} />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route>
          <Route render={() => <Error />}></Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
