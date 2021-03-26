import React from 'react';
import {NavLink} from 'react-router-dom';

import "./Nav.scss";

const Nav  = ({ setAccessToken }) => {

    const handleLogOut = () => {
        setAccessToken("");
    }

    return ( 
        <div className="nav">
            <NavLink className="nav-item" activeClassName="is-active" to="/search"><i class="fas fa-search"></i><span>Search</span></NavLink>
            <NavLink className="nav-item" activeClassName="is-active" to="/me/conversations"><i class="fas fa-envelope"></i><span>Messages</span></NavLink>
            <NavLink className="nav-item" activeClassName="is-active" to="/me/basket"><i class="fas fa-shopping-basket"></i><span>Baskets</span></NavLink>
            <NavLink className="nav-item" activeClassName="is-active" to="/me" exact><i class="fas fa-user-circle"></i><span>My profile</span></NavLink>
            <NavLink className="nav-item" activeClassName="is-active" to="/me/books"><i class="fas fa-book"></i><span>My books</span></NavLink>
            <NavLink className="nav-item" activeClassName="is-active" to="/me/pokes"><div className="poke"></div></NavLink>
            <NavLink className="nav-item log-out" to="/" onClick={handleLogOut}><i class="fas fa-power-off"></i></NavLink>
        </div>
      );
}
 
export default Nav;