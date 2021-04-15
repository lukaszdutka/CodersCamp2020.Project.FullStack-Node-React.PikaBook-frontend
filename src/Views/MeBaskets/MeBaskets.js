import SingleBasket from "./SingleBasket";

const MeBaskets = ({
  accessToken,
  loggedUser,
  loggedUsersBaskets,
  getLoggedUsersBaskets,
  basketsInterval,
}) => {
  const basketList = loggedUsersBaskets.map((basket) => (
    <SingleBasket
      key={basket._id}
      basket={basket}
      loggedUser={loggedUser}
      accessToken={accessToken}
      getLoggedUsersBaskets={getLoggedUsersBaskets}
      basketsInterval={basketsInterval}
    />
  ));
  return (
    <div className="meBaskestsContainer">
      <h1>My baskets</h1>
      {basketList}
    </div>
  );
};

export default MeBaskets;
