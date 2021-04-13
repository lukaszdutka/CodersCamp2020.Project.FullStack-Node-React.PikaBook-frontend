const Me  = ({ loggedUser: { name, email, location } }) => {

    return ( 
        <div className="meContainer">
            <h1>Account details</h1>
            <p><b>Name:</b> {name}</p>
            <p><b>E-mail:</b> {email}</p>
            <p><b>Location:</b> {location ? location : "-"}</p>
        </div>
      );
}
 
export default Me;