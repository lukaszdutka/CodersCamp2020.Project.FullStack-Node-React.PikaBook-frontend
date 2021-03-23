import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav  = () => {
    return ( 
        <div className="nav">
            <NavLink className="nav-item" activeClassName="is-active" to="/search">Search</NavLink>
            <NavLink className="nav-item" activeClassName="is-active" to="/me/conversations">Messages</NavLink>
            <NavLink className="nav-item" activeClassName="is-active" to="/me/basket">Baskets</NavLink>
            <NavLink className="nav-item" activeClassName="is-active" to="/me/books">My books</NavLink>
            <NavLink className="nav-item" activeClassName="is-active" to="/me/pokes">Notifications</NavLink>
        </div>
      );
}
 
export default Nav;