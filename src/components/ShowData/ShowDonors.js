import React from 'react'

function ShowDonors({ donor }) {
  return (
    <div className="row bg-light w-75 mx-auto p-3 my-2">
      <div className="col-4">
        <img src="https://gsdl.org.in/gsdl%20image/user.png" width="250" height="250" className="align-self-center" alt=""/>
      </div>
      <div className="col-8 d-flex flex-column justify-content-center">
        <div className="row no-gutters w-100 align-self-center my-2 ">
          <div className="col">
            <p className="lead text-capitalize">{donor.name}</p>
          </div>
          <div className="col">
              <p className="text-capitalize">Blood Group : {donor.bloodGroup}</p>
          </div>
        </div>
        <div className="row no-gutters w-100 align-self-center my-2 ">
          <div className="col">
            <p>Contact : {donor.mobile}</p>
          </div>
          <div className="col">
              <p>Email : {donor.email}</p>
          </div>
        </div>
        <div className="row no-gutters w-100 align-self-center my-2 ">
          <div className="col">
            <p className="text-capitalize">Distt. : {donor.distt}</p>
          </div>
          <div className="col">
              <p className="text-capitalize">State : {donor.state}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowDonors
