import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "./UserContext";

function PrivateRoute({ path, children }) {
    const { currentUser } = useContext(UserContext);
  
    console.info(
        "PrivateRoute",
        "path=", path,
        "currentUser=", currentUser,
    );
  
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
  
    return (
        <Route  path={path}>
          {children}
        </Route>
    );
  }
  
  export default PrivateRoute;