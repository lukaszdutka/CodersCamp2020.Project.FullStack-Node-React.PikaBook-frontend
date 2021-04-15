const Me = ({ loggedUser: { name, email, location }, loggedUsersBaskets }) => {
  const successfulExchanges = loggedUsersBaskets.filter(
    (basket) => basket.status === "success"
  ).length;

  return (
    <div className="meContainer">
      <h1>Account details</h1>
      <p>
        <b>Name:</b> {name}
      </p>
      <p>
        <b>E-mail:</b> {email}
      </p>
      <p>
        <b>Location:</b> {location ? location : "-"}
      </p>
      <p>
        <b>Successful exchanges:</b> {successfulExchanges}
      </p>
    </div>
  );
};

export default Me;
