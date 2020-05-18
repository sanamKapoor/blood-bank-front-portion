import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ShowProfile({ user }) {

  const [profile, setProfile] = useState('');

  const history = useHistory();

  useEffect(() => {
    getProfile(user)
  }, [user])

  function getProfile(user) {
    let id = localStorage.getItem('user');
    axios.get(`http://localhost:5000/${user}/profile/${id}`, {
      headers: {
        'Authorization': `jwt ${localStorage.getItem('jwtToken')}`
      }
    })
    .then(res => {
      const { data } = res;
      if(user === 'Donor'){
        setProfile(data.donor)
      } else {
        setProfile(data.bank)
      }
    })
  }


  const deleteAccount = () => {
    alert('Are you sure !');
    let id = localStorage.getItem('user');

    if(user === 'Donor'){
      axios.delete(`http://localhost:5000/donor/profile/${id}`, {
        headers: {
          'Authorization': `jwt ${localStorage.getItem('jwtToken')}`
        }
      })
              .then(res => {
                const { data: { message}} = res;
                console.log(message);
              })
              .catch(err => console.log(err))
    } else{
      axios.delete(`http://localhost:5000/bank/profile/${id}`, {
        headers: {
          'Authorization': `jwt ${localStorage.getItem('jwtToken')}`
        }
      })
              .then(res => {
                const { data: { message}} = res;
                console.log(message);
              })
              .catch(err => console.log(err))
      }
    localStorage.clear();
    history.push('/');
  }

  const updateProfile = () => {
    if(user === 'Donor'){
      history.push("/donor-register");
    } else{
      history.push("/bank-register");
    }
  }

  const BankProfile = () => {
    return(
      <div className="container w-75 mx-auto mt-5 border border-muted" style={{borderRadius: "15px"}}>
        <div className="w-100 d-flex flex-column align-items-center my-4">
          <img src="https://image.flaticon.com/icons/png/512/1297/1297136.png" width="200" height="200" alt=""/>
          <h4 className="my-3">{profile.name}</h4>
            <p className="text-center text-muted">{profile.description}</p>
          <div className="d-flex">
           <button className="btn btn-info mx-1" onClick={updateProfile}>Update Profile</button>
          <button className="btn btn-danger mx-1" onClick={deleteAccount}>Delete Account</button>
          </div>
        </div>

        <div className="mx-5 my-4 text-muted">
          <h4 className="text-dark">Contact and Address Information</h4>
          <hr/>
         <p className="lead text-capitalize">Type : {profile.type}</p>
          <div className="row no-gutters my-1">
            <p className="col lead">Contact : {profile.contact}</p>
            <p className="col lead">Email : {profile.email}</p>
          </div>
          <div className="row no-gutters my-1">
            <p className="col lead text-capitalize">Distt : {profile.distt}</p>
            <p className="col lead text-capitalize">State : {profile.state}</p>
          </div>
        </div>
      </div>
    )
  }

  const DonorProfile = () => {
    return(
      <div className="container w-75 mx-auto mt-5 border border-muted" style={{borderRadius: "15px"}}>
        <div className="w-100 d-flex flex-column align-items-center my-4">
          <img src="https://gsdl.org.in/gsdl%20image/user.png" width="200" height="200" alt=""/>
          <h4 className="my-3">{profile.name}</h4>
          <div className="d-flex">
           <button className="btn btn-info mx-1" onClick={updateProfile}>Update Profile</button>
          <button className="btn btn-danger mx-1" onClick={deleteAccount}>Delete Account</button>
          </div>
        </div>

        <div className="mx-5 my-4 text-muted">
          <h4 className="text-dark">Personal Information</h4>
          <hr/>
          <div className="row no-gutters my-1">
            <p className="col lead">Aadhar : {profile.aadhar}</p>
            <p className="col lead text-capitalize">Gender : {profile.gender}</p>
          </div>
          <div className="row no-gutters my-1">
            <p className="col lead">Blood Group : {profile.bloodGroup}</p>
            <p className="col lead">Date of Birth : {profile.dob}</p>
          </div>
          <div className="row no-gutters my-1">
            <p className="col lead">Weight : {profile.weight}</p>
            <p className="col lead">Age : {profile.age}</p>
          </div>
        </div>

        <div className="mx-5 my-4 text-muted">
          <h4 className="text-dark">Contact and Address Information</h4>
          <hr/>
          <div className="row no-gutters my-1">
            <p className="col lead">Contact : {profile.mobile}</p>
            <p className="col lead">Email : {profile.email}</p>
          </div>
          <div className="row no-gutters my-1">
            <p className="col lead text-capitalize">Distt : {profile.distt}</p>
            <p className="col lead text-capitalize">State : {profile.state}</p>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div>
      {
        user === 'Donor' ? <DonorProfile />  : ''
      }
      {
        user === 'Bank' ? <BankProfile />  : ''
      }
    </div>
  )
}

export default ShowProfile
