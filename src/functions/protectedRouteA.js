import React from "react";
import { Redirect, Route } from "react-router-dom";


function ProtectedRouteA({ component: Component, ...restOfProps }) {
    let isAuthenticated = false
    const user = JSON.parse(localStorage.getItem('user'))
  
    if (user === {} ){
      isAuthenticated = false
    } 

    if (user!==null){
      if(user.cnpj === null){
        isAuthenticated  = false
      }
    }
    
    if (user!==null){
      if(user.cnpj !== null){
        isAuthenticated  = true
      }
    }

    return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/addinfo" />
      }
    />
  );
}

export default ProtectedRouteA;