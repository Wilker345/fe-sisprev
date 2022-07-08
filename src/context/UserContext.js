import React, {createContext} from 'react'
export const LoginContext = createContext();

function LoginProvider (props){

  return(
    <LoginContext.Provider>
      {props.children}
    </LoginContext.Provider>
  )
}
export default LoginProvider
