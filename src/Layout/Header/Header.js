import React from 'react';
import logo from '../../Shared/Images/pikabook.png';
import Nav from "../Nav/Nav";

import "./Header.scss";

const Header  = ({ setAccessToken, accessToken }) => {
    return ( 
        <div className="header">
            <img src={logo} alt="Pikabook" />
            {accessToken && <Nav setAccessToken={setAccessToken}/>}
        </div>
      );
}
 
export default Header;