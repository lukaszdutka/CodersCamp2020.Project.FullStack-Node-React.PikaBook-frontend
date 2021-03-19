import React from 'react'

const User  = ({ match }) => {
    return ( 
        <div>
            User {match.params.id}
        </div>
      );
}
 
export default User;