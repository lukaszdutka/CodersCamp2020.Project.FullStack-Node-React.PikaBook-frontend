import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Login from "./Views/Login/Login";
import Registartion from "./Views/Registration/Registration";
import Search from "./Views/Search/Search";
import User from "./Views/User/User";
import Me from "./Views/Me/Me";
import MeBooks from "./Views/MeBooks/MeBooks";
import MeBaskets from "./Views/MeBaskets/MeBaskets";
import Conversations from "./Views/Conversations/Conversations";
import SingleConversation from "./Views/SingleConversation/SingleConversation";
import Pokes from "./Views/Pokes/Pokes";
import Basket from "./Views/Basket/Basket";
import Error from "./Views/Error";

import fetchPokes from "./API/fetchPokes";
import fetchBaskets from "./API/fetchBaskets";
import { fetchLoggedUser } from "./API/fetchUser";
import { fetchConversations } from "./API/fetchConversations";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [loggedUser, setLoggedUser] = useState({});
  const [loggedUsersPokes, setLoggedUsersPokes] = useState([]);
  const [loggedUsersBaskets, setLoggedUsersBaskets] = useState([]);
  const [loggedUsersConversations, setLoggedUsersConversations] = useState([]);
  const pokesInterval = useRef();
  const conversationsInterval = useRef();
  const basketsInterval = useRef();

  useEffect(() => {
    clearInterval(pokesInterval.current);
    clearInterval(conversationsInterval.current);
    clearInterval(basketsInterval.current);
    if (accessToken) {
      getLoggedUserData(accessToken);
      getLoggedUsersPokes(accessToken);
      getLoggedUsersBaskets(accessToken);
      getLoggedUsersConversations(accessToken);
    }
    if (!accessToken) {
      setLoggedUsersPokes([]);
      setLoggedUser({});
      setLoggedUsersBaskets([]);
      setLoggedUsersConversations([]);
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
    const interval = setInterval(async () => getPokes(), 5000);
    pokesInterval.current = interval;
    return () => clearInterval(pokesInterval.current);
  };

  const getLoggedUsersConversations = async (accessToken) => {
    const getConversations = async () => {
      const res = await fetchConversations(accessToken);
      if (res.error) console.log(res.error);
      if (res.conversations) setLoggedUsersConversations(res.conversations);
    };
    getConversations();
    const interval = setInterval(async () => getConversations(), 5000);
    conversationsInterval.current = interval;
    return () => clearInterval(conversationsInterval.current);
  };

  const getLoggedUsersBaskets = async (accessToken) => {
    const getBaskets = async () => {
      const res = await fetchBaskets(accessToken);
      if (res.error) console.log(res.error);
      if (res.baskets) setLoggedUsersBaskets(res.baskets.reverse());
      console.log(res.baskets);
    };
    getBaskets();
    const interval = setInterval(async () => getBaskets(), 5000);
    basketsInterval.current = interval;
    return () => clearInterval(basketsInterval.current);
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header
        setAccessToken={setAccessToken}
        accessToken={accessToken}
        loggedUser={loggedUser}
        loggedUsersPokes={loggedUsersPokes}
        loggedUsersConversations={loggedUsersConversations}
        loggedUsersBaskets={loggedUsersBaskets}
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
                <Me accessToken={accessToken} loggedUser={loggedUser} />
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
            exact
            render={() =>
              accessToken ? (
                <Conversations
                  accessToken={accessToken}
                  loggedUser={loggedUser}
                  loggedUsersConversations={loggedUsersConversations}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route>
          <Route
            path="/me/conversations/conversation"
            render={() =>
              accessToken ? (
                <SingleConversation
                  accessToken={accessToken}
                  getLoggedUsersConversations={getLoggedUsersConversations}
                  conversationsInterval={conversationsInterval}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route>
          <Route
            path="/me/baskets"
            render={() =>
              accessToken ? (
                <MeBaskets
                  accessToken={accessToken}
                  loggedUser={loggedUser}
                  loggedUsersBaskets={loggedUsersBaskets}
                  getLoggedUsersBaskets={getLoggedUsersBaskets}
                  basketsInterval={basketsInterval}
                />
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
