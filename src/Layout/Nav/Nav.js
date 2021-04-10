import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ setAccessToken, loggedUser: { _id }, loggedUsersPokes }) => {
  const handleLogOut = () => {
    setAccessToken("");
  };

  const newPokes = () => {
    const receivedPokes = loggedUsersPokes.filter(
      (poke) => poke.recipient._id === _id
    );
    return receivedPokes.filter((poke) => !poke.read).length;
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
      </NavLink>
      <NavLink className="nav-item" activeClassName="is-active" to="/me/basket">
        <i className="fas fa-shopping-basket"></i>
        <span>Baskets</span>
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
        <div className="poke">
          {newPokes() > 0 && <div className="alert">{newPokes()}</div>}
        </div>
      </NavLink>
      <NavLink className="nav-item log-out" to="/" onClick={handleLogOut}>
        <i className="fas fa-power-off"></i>
      </NavLink>
    </div>
  );
};

export default Nav;
