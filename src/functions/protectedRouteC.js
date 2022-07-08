import React from "react";
import { Redirect, Route } from "react-router-dom";


function ProtectedRouteC({ component: Component, ...restOfProps }) {
    let isAuthenticated = true
    const user = JSON.parse(localStorage.getItem('user'))
    
    if (user!==null){
        isAuthenticated  = false
    }

    return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/accidents" />
      }
    />
  );
}

export default ProtectedRouteC;