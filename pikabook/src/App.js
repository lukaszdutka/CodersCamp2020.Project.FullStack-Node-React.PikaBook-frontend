import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './Layout/Header/Header';
import Nav from './Layout/Nav/Nav';
import Footer from './Layout/Footer/Footer'
import Login from "./Views/Login/Login";
import Registartion from "./Views/Registration/Registration";
import Search from "./Views/Search/Search";
import User from "./Views/User/User";
import Me from "./Views/Me/Me";
import Basket from "./Views/Basket/Basket";
import Error from "./Views/Error";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <main>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/registration" component={Registartion}></Route>
          <Route path="/search" exact component={Search}></Route>
          <Route path="/user/:id" exact component={User}></Route>
          <Route path="/search/:id/basket" component={Basket}></Route>
          <Route path="/me" component={Me}></Route>
          <Route component={Error}></Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
