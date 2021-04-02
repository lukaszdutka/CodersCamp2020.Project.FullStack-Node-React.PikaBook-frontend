import "./App.scss";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Login from "./Views/Login/Login";
import Registartion from "./Views/Registration/Registration";
import Search from "./Views/Search/Search";
import User from "./Views/User/User";
import Me from "./Views/Me/Me";
import MeBooks from "./Views/Me/MeBooks";
import MeBaskets from "./Views/Me/MeBaskets";
import MeConversations from "./Views/Me/MeConversations";
import Pokes from "./Views/Pokes/Pokes";
import Basket from "./Views/Basket/Basket";
import Error from "./Views/Error";

import fetchPokes from "./API/fetchPokes";
import { fetchLoggedUser } from "./API/fetchUser";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [loggedUsersPokes, setLoggedUsersPokes] = useState([]);
  const pokesInterval = useRef();

  useEffect(() => {
    clearInterval(pokesInterval.current);
    if (accessToken) {
      getLoggedUserData(accessToken);
      getLoggedUsersPokes(accessToken);
    }
    if (!accessToken) {
      setLoggedUsersPokes([]);
      setLoggedUser("");
    }
  }, [accessToken]);

  const getLoggedUserData = async (accessToken) => {
    const res = await fetchLoggedUser(accessToken);
    if (res.error) console.log(res.error);
    if (res.user) setLoggedUser(res.user);
  };

  const getLoggedUsersPokes = async (accessToken) => {
    const getPokes = async () => {
      const res = await fetchPokes(accessToken);
      if (res.error) console.log(res.error);
      if (res.pokes) setLoggedUsersPokes(res.pokes.reverse());
    };
    getPokes();
    const pokeInterval = setInterval(async () => getPokes(), 5000);
    pokesInterval.current = pokeInterval;
    return () => clearInterval(pokesInterval.current);
  };

  return (
    <BrowserRouter>
      <Header
        setAccessToken={setAccessToken}
        accessToken={accessToken}
        loggedUser={loggedUser}
        loggedUsersPokes={loggedUsersPokes}
      />
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
                  setLoggedUser={setLoggedUser}
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
                <Search accessToken={accessToken} loggedUser={loggedUser} />
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
            path="/basket"
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
            exact
            render={() =>
              accessToken ? (
                <Me accessToken={accessToken} />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route>
          <Route
            path="/me/books"
            render={() =>
              accessToken ? (
                <MeBooks accessToken={accessToken} />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route>
          <Route
            path="/me/pokes"
            render={() =>
              accessToken ? (
                <Pokes
                  accessToken={accessToken}
                  loggedUsersPokes={loggedUsersPokes}
                  setLoggedUsersPokes={setLoggedUsersPokes}
                  loggedUser={loggedUser}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route>
          <Route
            path="/me/conversations"
            render={() =>
              accessToken ? (
                <MeConversations accessToken={accessToken} />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route>
          <Route
            path="/me/basket"
            render={() =>
              accessToken ? (
                <MeBaskets accessToken={accessToken} />
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
