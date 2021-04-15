import React from "react";
import logo from "../../Assets/Images/pikabook.png";
import Nav from "../Nav/Nav";

const Header = ({
  setAccessToken,
  accessToken,
  loggedUser,
  loggedUsersPokes,
  loggedUsersConversations,
  loggedUsersBaskets
}) => {
  return (
    <header>
      <img className="img-logo" src={logo} alt="Pikabook" />
      {accessToken && (
        <Nav
          setAccessToken={setAccessToken}
          loggedUser={loggedUser}
          loggedUsersPokes={loggedUsersPokes}
          loggedUsersConversations={loggedUsersConversations}
          loggedUsersBaskets={loggedUsersBaskets}
        />
      )}
    </header>
  );
};

export default Header;
