import React from 'react'

function ShowBanks({ bank }) {
  return (
    <div className="row bg-light w-75 mx-auto p-3 my-2">
    <div className="col-4">
      <img src="https://image.flaticon.com/icons/png/512/1297/1297136.png" height="250" width="250" className="align-self-center" alt=""/>
    </div>
    <div className="col-8 d-flex flex-column justify-content-center">
      <div className="row no-gutters w-100 align-self-center my-2 ">
        <div className="col">
          <p className="lead text-capitalize">{bank.name}</p>
        </div>
        <div className="col">
            <p className="text-capitalize">Type : {bank.type}</p>
        </div>
      </div>
      <div className="row no-gutters w-100 align-self-center my-2 ">
        <div className="col">
          <p>Contact : {bank.contact}</p>
        </div>
        <div className="col">
            <p>Email : {bank.email}</p>
        </div>
      </div>
      <div className="row no-gutters w-100 align-self-center my-2 ">
        <div className="col">
          <p className="text-capitalize">Distt. : {bank.distt}</p>
        </div>
        <div className="col">
            <p className="text-capitalize">State : {bank.state}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ShowBanks
