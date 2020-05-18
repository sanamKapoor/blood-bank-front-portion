import React, { createContext, useReducer } from 'react'
import bankReducer from '../reducer/bankReducer';

const initState = {}

export const MyBankContext = createContext(initState);

function BankContext(props) {
  const [state, dispatchBank] = useReducer(bankReducer, initState)
  
  return (
    <MyBankContext.Provider value={{ bank: state.bank, dispatchBank }}>
      {props.children}
    </MyBankContext.Provider>
  )
}

export default BankContext
