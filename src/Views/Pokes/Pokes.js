import { useEffect, useState, useRef } from "react";
import Poke from "./Poke";
import getPagination from "../../SharedFunctions/getPagination";
import Pagination from "../../SharedComponents/Pagination";
import updatePoke from "../../API/updatePoke";

const Pokes = ({
  accessToken,
  loggedUsersPokes,
  setLoggedUsersPokes,
  loggedUser: { _id },
}) => {
  const [receivedPage, setReceivedPage] = useState(1);
  const [offeredPage, setOfferedPage] = useState(1);
  const [prevPokes, setPrevPokes] = useState([]);
  const onPageLimit = 10;
  const scrollTo1 = useRef();
  const scrollTo2 = useRef();


  useEffect(() => {
    if (loggedUsersPokes.length !== prevPokes.length)
      setPrevPokes(loggedUsersPokes);
    const receivedPokes = loggedUsersPokes.filter(
      (poke) => poke.recipient._id === _id
    );
    if (receivedPokes.some((poke) => !poke.read)) {
      const updatedPokes = loggedUsersPokes.map((poke) => {
        updatePoke(accessToken, poke._id);
        return { ...poke, read: true };
      });
      setLoggedUsersPokes(updatedPokes);
    }
  }, [accessToken, loggedUsersPokes, setLoggedUsersPokes, prevPokes, _id]);

  const receivedPokes = prevPokes.filter((poke) => poke.recipient._id === _id);

  const offeredPokes = prevPokes.filter((poke) => poke.sender._id === _id);

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
      <div className="pokeColumn1" ref={scrollTo1}>
        <h1>Pokes received</h1>
        <div className="pokeContainer">{receivedPokesList}</div>
        {receivedPokes.length > onPageLimit && (
          <Pagination
            page={receivedPage}
            setPage={setReceivedPage}
            list={receivedPokes}
            limit={onPageLimit}
            scrollTo={scrollTo1}
          />
        )}
      </div>
      <div className="pokeColumn2" ref={scrollTo2}>
        <h1>Pokes sent</h1>
        <div className="pokeContainer">{offeredPokesList}</div>
        {offeredPokes.length > onPageLimit && (
          <Pagination
            page={offeredPage}
            setPage={setOfferedPage}
            list={offeredPokes}
            limit={onPageLimit}
            scrollTo={scrollTo2}
          />
        )}
      </div>
    </div>
  );
};

export default Pokes;
