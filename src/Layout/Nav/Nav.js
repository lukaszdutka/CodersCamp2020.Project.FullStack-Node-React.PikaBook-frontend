import React from 'react';
import {NavLink} from 'react-router-dom';
import poke from '../../Shared/Images/poke.png';

import "./Nav.scss";

const Nav  = ({ setAccessToken }) => {

    const handleLogOut = (e) => {
        e.preventDefault();
        setAccessToken("");
    }

    return ( 
        <div className="nav">
            <NavLink className="nav-item" activeClassName="is-active" to="/search">Search</NavLink>
            <NavLink className="nav-item" activeClassName="is-active" to="/me/conversations">Messages</NavLink>
            <NavLink className="nav-item" activeClassName="is-active" to="/me/basket">Baskets</NavLink>
            <NavLink className="nav-item" activeClassName="is-active" to="/me/books">My books</NavLink>
            <NavLink className="nav-item img" activeClassName="is-active" to="/me/pokes"><img src={poke} alt="Notifications" /></NavLink>
            <NavLink className="nav-item log-out" to="/" onClick={handleLogOut}>LOG OUT</NavLink>
        </div>
      );
}
 
export default Nav;