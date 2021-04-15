import React from "react";
import { NavLink } from "react-router-dom";

import newBasketsToLoggedUser from '../../SharedFunctions/filterBaskets';

const Nav = ({
  setAccessToken,
  loggedUser: { _id },
  loggedUsersPokes,
  loggedUsersConversations,
  loggedUsersBaskets,
}) => {
  const handleLogOut = () => {
    setAccessToken("");
  };

  const newPokes = () => {
    const receivedPokes = loggedUsersPokes.filter(
      (poke) => poke.recipient._id === _id
    );
    return receivedPokes.filter((poke) => !poke.read).length;
  };

  const newMessages = () => {
    return loggedUsersConversations.filter((conversation) => {
      const { read, recipient } = conversation.messages[0];
      return !read && recipient === _id;
    }).length;
  };

  const newBaskets = () => {
    return newBasketsToLoggedUser(loggedUsersBaskets, _id).length;
  };

  return (
    <div className="nav">
      <NavLink className="nav-item" activeClassName="is-active" to="/search">
        <i className="fas fa-search"></i>
        <span>Search</span>
      </NavLink>
      <NavLink
        className="nav-item"
        activeClassName="is-active"
        to="/me/conversations"
      >
        <i className="fas fa-envelope"></i>
        <span>Messages</span>
        {newMessages() > 0 && <div className="alert">{newMessages()}</div>}
      </NavLink>
      <NavLink className="nav-item" activeClassName="is-active" to="/me/baskets">
        <i className="fas fa-shopping-basket"></i>
        <span>Baskets</span>
        {newBaskets() > 0 && <div className="alert">{newBaskets()}</div>}
      </NavLink>
      <NavLink className="nav-item" activeClassName="is-active" to="/me" exact>
        <i className="fas fa-user-circle"></i>
        <span>My profile</span>
      </NavLink>
      <NavLink className="nav-item" activeClassName="is-active" to="/me/books">
        <i className="fas fa-book"></i>
        <span>My books</span>
      </NavLink>
      <NavLink className="nav-item" activeClassName="is-active" to="/me/pokes">
        <i class="fas fa-bell"></i>
        {newPokes() > 0 && <div className="alert">{newPokes()}</div>}
      </NavLink>
      <NavLink className="nav-item log-out" to="/" onClick={handleLogOut}>
        <i className="fas fa-power-off"></i>
      </NavLink>
    </div>
  );
};

export default Nav;
