import React from 'react';
import logo from '../../Images/pikabook.png';
import Nav from "../Nav/Nav";

const Header  = ({ accessToken }) => {
    return ( 
        <div className="header">
            <img src={logo} alt="Pikabook" />
            {accessToken && <Nav />}
        </div>
      );
}
 
export default Header;