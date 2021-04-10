import { useEffect, useState } from "react";
import Poke from "./Poke";
import getPagination from "../../SharedFunctions/getPagination";
import Pagination from "../../SharedComponents/Pagination";
import updatePoke from "../../API/updatePoke";

const Pokes = ({ accessToken, loggedUsersPokes, setLoggedUsersPokes, loggedUser: { _id } }) => {
  const [receivedPage, setReceivedPage] = useState(1);
  const [offeredPage, setOfferedPage] = useState(1);
  const [prevPokes, setPrevPokes] = useState(loggedUsersPokes);
  const onPageLimit = 10;

  useEffect(() => {
    if (loggedUsersPokes.length !== prevPokes.length) setPrevPokes(loggedUsersPokes);
    if (loggedUsersPokes.some(poke => !poke.read)) {
      const updatedPokes = loggedUsersPokes.map(poke => {
        updatePoke(accessToken, poke._id)
        return {...poke, read: true};
      });
      setLoggedUsersPokes(updatedPokes);
    }     
  }, [accessToken, loggedUsersPokes, setLoggedUsersPokes, prevPokes]);

  const receivedPokes = prevPokes.filter(
    (poke) => poke.recipient._id === _id
  );

  const offeredPokes = prevPokes.filter(
    (poke) => poke.sender._id === _id
  );

  let receivedPokesList = getPagination(
    receivedPage,
    onPageLimit,
    receivedPokes
  );
  receivedPokesList = receivedPokesList.map((poke) => {
    return <Poke key={poke._id} poke={poke} type="received" />;
  });

  let offeredPokesList = getPagination(offeredPage, onPageLimit, offeredPokes);
  offeredPokesList = offeredPokesList.map((poke) => {
    return <Poke key={poke._id} poke={poke} type="sent" />;
  });

  return (
    <div className="pokesContainer">
      <div>
        <h1>Pokes received:</h1>
        {receivedPokes.length > onPageLimit && (
          <Pagination
            page={receivedPage}
            setPage={setReceivedPage}
            list={receivedPokes}
            limit={onPageLimit}
          />
        )}
        <div>{receivedPokesList}</div>
        {receivedPokes.length > onPageLimit && (
          <Pagination
            page={receivedPage}
            setPage={setReceivedPage}
            list={receivedPokes}
            limit={onPageLimit}
          />
        )}
      </div>
      <div>
        {offeredPokes.length > onPageLimit && (
          <Pagination
            page={offeredPage}
            setPage={setOfferedPage}
            list={offeredPokes}
            limit={onPageLimit}
          />
        )}
        <h1>Pokes sent:</h1>
        <div>{offeredPokesList}</div>
        {offeredPokes.length > onPageLimit && (
          <Pagination
            page={offeredPage}
            setPage={setOfferedPage}
            list={offeredPokes}
            limit={onPageLimit}
          />
        )}
      </div>
    </div>
  );
};

export default Pokes;
