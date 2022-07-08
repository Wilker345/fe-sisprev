import React, {useContext} from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginContext } from '../context/UserContext';

function ProtectedRouteB({ component: Component, ...restOfProps }) {
    let isValid = false
    const {user} = useContext(LoginContext)

    if (user === {} ){
      isValid = false
    } 

    if (user!==null){
      if(user.cnpj === null){
        isValid  = true
      }
    }
    
    if (user!==null){
      if(user.cnpj !== null){
        isValid = false
      }
    }

    return (
    <Route
      {...restOfProps}
      render={(props) =>
        isValid ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRouteB;