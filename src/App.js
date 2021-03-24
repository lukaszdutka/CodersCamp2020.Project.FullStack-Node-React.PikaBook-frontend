import "./App.scss";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";

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
import MePokes from "./Views/Me/MePokes";
import Basket from "./Views/Basket/Basket";
import Error from "./Views/Error";

function App() {
  const [accessToken, setAccessToken] = useState("");

  return (
    <BrowserRouter>
      <Header 
        setAccessToken={setAccessToken}
        accessToken={accessToken}
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
                <MePokes accessToken={accessToken} />
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
