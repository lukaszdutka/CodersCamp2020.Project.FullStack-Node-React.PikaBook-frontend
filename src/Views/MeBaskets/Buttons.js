import { updateBasketStatus } from "../../API/updateBasket";

const Buttons = ({
  accessToken,
  status,
  _id,
  isUserRequestor,
  coOwnerName,
  getLoggedUsersBaskets,
  basketsInterval,
}) => {
  const handleOnClick = async (e) => {
    let res = await updateBasketStatus(accessToken, e.target.name, _id);
    if (res.error) console.log(res.error);
    if (res.baskets) {
      clearTimeout(basketsInterval.current);
      getLoggedUsersBaskets(accessToken);
    }
  };

  return (
    <div className="buttonsAndStatus">
      {status === "pending" && isUserRequestor && (
        <>
          <p>You made an offer to {coOwnerName}</p>
          <button
            name="cancelled"
            onClick={handleOnClick}
            className="buttonDark"
          >
            Cancel
          </button>
        </>
      )}
      {status === "pending" && !isUserRequestor && (
        <>
          <p>{coOwnerName} made an offer</p>
          <button
            name="accepted"
            onClick={handleOnClick}
            className="buttonDark"
          >
            Accept
          </button>{" "}
          <button
            name="rejected"
            onClick={handleOnClick}
            className="buttonDark"
          >
            Reject
          </button>
        </>
      )}
      {status === "accepted" && isUserRequestor && (
        <>
          <p>{coOwnerName} accepted your offer</p>
          <button
            name="successByRequestor"
            onClick={handleOnClick}
            className="buttonDark"
          >
            Success
          </button>
          <button
            name="failedByTarget"
            onClick={handleOnClick}
            className="buttonDark"
          >
            Failed
          </button>
        </>
      )}
      {status === "accepted" && !isUserRequestor && (
        <>
          <p>You accepted {coOwnerName}'s offer</p>
          <button
            name="successByTarget"
            onClick={handleOnClick}
            className="buttonDark"
          >
            Success
          </button>
          <button
            name="failedByRequestor"
            onClick={handleOnClick}
            className="buttonDark"
          >
            Failed
          </button>
        </>
      )}
      {status === "successByRequestor" && isUserRequestor && (
        <p>Success on your side</p>
      )}
      {status === "successByRequestor" && !isUserRequestor && (
        <>
          <p>{coOwnerName} stated you delivered your books</p>
          <button
            name="successByTarget"
            onClick={handleOnClick}
            className="buttonDark"
          >
            Success
          </button>
          <button
            name="failedByRequestor"
            onClick={handleOnClick}
            className="buttonDark"
          >
            Failed
          </button>
        </>
      )}
      {status === "successByTarget" && isUserRequestor && (
        <>
          <p>{coOwnerName} stated you delivered your books</p>
          <button
            name="successByRequestor"
            onClick={handleOnClick}
            className="buttonDark"
          >
            Success
          </button>
          <button
            name="failedByTarget"
            onClick={handleOnClick}
            className="buttonDark"
          >
            Failed
          </button>
        </>
      )}
      {status === "successByTarget" && !isUserRequestor && (
        <p>Success on your side</p>
      )}
      {status === "rejected" && isUserRequestor && (
        <p>{coOwnerName} rejected your offer</p>
      )}
      {status === "rejected" && !isUserRequestor && (
        <p>You rejected the offer</p>
      )}
      {status === "cancelled" && isUserRequestor && (
        <p>You cancelled your offer</p>
      )}
      {status === "cancelled" && !isUserRequestor && (
        <p>{coOwnerName} cancelled his/her offer</p>
      )}
      {status === "failedByRequestor" && isUserRequestor && (
        <p>{coOwnerName} stated you failed to delived your books</p>
      )}
      {status === "failedByRequestor" && !isUserRequestor && (
        <p>You stated {coOwnerName} failed to delived his/her books</p>
      )}
      {status === "failedByTarget" && isUserRequestor && (
        <p>You stated {coOwnerName} failed to delived his/her books</p>
      )}
      {status === "failedByTarget" && !isUserRequestor && (
        <p>{coOwnerName} stated you failed to delived your books</p>
      )}
      {status === "success" && <p>Success on both sides!</p>}
    </div>
  );
};

export default Buttons;
