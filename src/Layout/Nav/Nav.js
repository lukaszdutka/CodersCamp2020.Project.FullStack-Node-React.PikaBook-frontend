import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import poke from '../../Assets/Images/poke-new.png';

import "./Nav.scss";

const Nav  = ({ setAccessToken }) => {

    const [open, setOpen] = useState(false);

    const handleLogOut = () => {
        setAccessToken("");
    }

    const openBurger = () => {
        setOpen(!open);
    }

    const hideBurger = () => {
        setOpen(false);
    }

    return ( 
        <div className="nav">
            <NavLink className="nav-item img" activeClassName="is-active" to="/me/pokes" onClick={hideBurger}><img src={poke} alt="Notifications" /></NavLink>
            <i className="fas fa-bars burger" onClick={openBurger}></i>
            <div className="nav-items" style={ {transform: open ? "translate(-50%, -50%)" : "" } }>
                <NavLink className="nav-item" activeClassName="is-active" to="/search" onClick={hideBurger}>Search</NavLink>
                <NavLink className="nav-item" activeClassName="is-active" to="/me/conversations" onClick={hideBurger}>Messages</NavLink>
                <NavLink className="nav-item" activeClassName="is-active" to="/me/basket" onClick={hideBurger}>Baskets</NavLink>
                <NavLink className="nav-item" activeClassName="is-active" to="/me/books" onClick={hideBurger}>My books</NavLink>
                
                <NavLink className="nav-item log-out" to="/" onClick={handleLogOut}>LOG OUT</NavLink>
            </div>
        </div>
      );
}
 
export default Nav;