import { useEffect, useState, useRef } from "react";

import SingleBasket from "./SingleBasket";
import newBasketsToLoggedUser from "../../SharedFunctions/filterBaskets";
import { updateBasketRead } from "../../API/updateBasket";
import getPagination from "../../SharedFunctions/getPagination";
import Pagination from "../../SharedComponents/Pagination";

const MeBaskets = ({
  accessToken,
  loggedUser,
  loggedUsersBaskets,
  getLoggedUsersBaskets,
  basketsInterval,
}) => {
  const [page, setPage] = useState(1);
  const onPageLimit = 4;
  const scrollTo = useRef();

  useEffect(() => {
    const newBaskets = newBasketsToLoggedUser(
      loggedUsersBaskets,
      loggedUser._id
    );
    const updateRead = async () => {
      newBaskets.forEach((basket) => updateBasketRead(accessToken, basket._id));
    };
    if (newBaskets.length > 0) updateRead();
  }, [accessToken, loggedUser._id, loggedUsersBaskets]);

  let basketList = getPagination(page, onPageLimit, loggedUsersBaskets);
  basketList = basketList.map((basket) => (
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
      <h1 ref={scrollTo} className="basketHeader">My baskets</h1>
      {basketList}
      {loggedUsersBaskets.length > onPageLimit && (
        <Pagination
          page={page}
          setPage={setPage}
          list={loggedUsersBaskets}
          limit={onPageLimit}
          scrollTo={scrollTo}
        />
      )}
    </div>
  );
};

export default MeBaskets;
