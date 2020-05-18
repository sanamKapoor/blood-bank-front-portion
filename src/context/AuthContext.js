import React, { createContext, useReducer } from 'react'
import authReducer from '../reducer/authReducer';

const initState = {}

export const MyAuthContext = createContext(initState);

function AuthContext(props) {
  const [state, dispatch] = useReducer(authReducer, initState)
  return (
    <MyAuthContext.Provider value={{ user: state.user, dispatch }}>
      {props.children}
    </MyAuthContext.Provider>
  )
}

export default AuthContext
