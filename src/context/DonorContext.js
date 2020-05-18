import React, { createContext, useReducer } from 'react'
import donorReducer from '../reducer/donorReducer';

const initState = {}

export const MyDonorContext = createContext(initState);

function DonorContext(props) {
  const [state, dispatchDonor] = useReducer(donorReducer, initState)
  return (
    <MyDonorContext.Provider value={{ donor: state.donor, dispatchDonor }}>
      {props.children}
    </MyDonorContext.Provider>
  )
}

export default DonorContext
