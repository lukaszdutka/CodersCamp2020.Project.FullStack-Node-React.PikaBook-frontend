import React from "react";
import logo from "../../Assets/Images/pikabook.png";
import Nav from "../Nav/Nav";

import "./Header.scss";

const Header = ({
  setAccessToken,
  accessToken,
  loggedUser,
  loggedUsersPokes,
}) => {
  return (
    <div className="header">
      <img className="img-logo" src={logo} alt="Pikabook" />
      {accessToken && (
        <Nav
          setAccessToken={setAccessToken}
          loggedUser={loggedUser}
          loggedUsersPokes={loggedUsersPokes}
        />
      )}
    </div>
  );
};

export default Header;
