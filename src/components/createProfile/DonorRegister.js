import React, { useState, useContext, useEffect } from 'react';
import { MyDonorContext } from '../../context/DonorContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function DonorRegister() {

  const {dispatchDonor} = useContext(MyDonorContext);

  const history = useHistory();

  let [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    aadhar: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    weight: undefined,
    age: undefined,
    distt: '',
    state: ''
  })

  let [update, setUpdate] = useState(false);
  const [err, setErr] = useState('');


  useEffect(() => {
    if(localStorage.getItem('user')){
      setUpdate(true)
      fetchUserData(localStorage.getItem('user'))
    }
  }, [])

  const fetchUserData = (id) => {
    axios.get(`http://localhost:5000/donor/profile/${id}`, {
      headers: {
        'Authorization': `jwt ${localStorage.getItem('jwtToken')}`
      }
    })
    .then(res => {
      const { data: {donor}} = res;
      setProfileData({
        name: donor.name,
        email: donor.email,
        mobile: donor.mobile,
        aadhar: donor.aadhar,
        bloodGroup: donor.bloodGroup,
        gender: donor.gender,
        dob: donor.dob,
        weight: donor.weight,
        age: donor.age,
        distt: donor.distt,
        state: donor.state
      });    
    })
  }

  const { name, email, password, mobile, aadhar, dob, gender, bloodGroup, weight, age, distt, state } = profileData;

  const handleSubmit = e => {
    e.preventDefault();
    if(name && email && password && mobile && aadhar && dob && bloodGroup && gender && weight && age && distt && state){
      if(update){  
        dispatchDonor({ type: 'UPDATE_PROFILE', payload: {
          id: localStorage.getItem('user'),
          data: profileData
        }})
        alert('Profile updated successfully !');
        history.push('/')
      } else {
        dispatchDonor({ type: 'REGISTER', payload: profileData})
        alert('Congrats, your profile has been created !')
        if(err === ''){
          history.push('/login')  
        }
      }
      
      profileData = {
        name: '',
        email: '',
        password: '',
        mobile: '',
        aadhar: '',
        dob: '',
        gender: '',
        bloodGroup: '',
        weight: null,
        age: null,
        distt: '',
        state: ''
      }
    } else {
      setErr('Require all Fields.')

      setTimeout(() => {
        setErr('')
      }, 2000)
    }

  }


  return (
    <section>
      <form className="form p-4 w-50 border border-danger text-danger text-center" onSubmit={e => handleSubmit(e)}>
      <i className="fas fa-user fa-5x text-danger my-4"></i>
      <p className="lead d-block">{update ? 'Update' : 'Create'} your Profile</p>
      <span className="text-center text-muted">{err ? err : ''}</span>
      <div className="row">
        <div className="col">
        <input 
          type="text" 
          name="name" 
          value={name}
          className="my-4 form-control" 
          placeholder="Username"
          onChange={(e) => setProfileData({ ...profileData, name: e.target.value})}
          />
        </div>
        <div className="col">
        <input 
          type="email" 
          name="email" 
          value={email}
          className="my-4 form-control" 
          placeholder="Email"
          onChange={(e) => setProfileData({ ...profileData, email: e.target.value})}
          />       
        </div>
      </div>
      <div className="row">
        <div className="col">
        <input 
          type="text" 
          name="mobile" 
          value={mobile}
          className="my-4 form-control" 
          placeholder="Contact Number"
          onChange={(e) => setProfileData({ ...profileData, mobile: e.target.value})}
          />
        </div>
        <div className="col">
        <input 
          type="password" 
          name="password" 
          value={password}
          className="my-4 form-control" 
          placeholder={update ? 'Enter New Password' : 'Password'}
          onChange={(e) => setProfileData({ ...profileData, password: e.target.value})}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
        <input 
          type="text" 
          name="aadhar" 
          value={aadhar}
          onChange={e => setProfileData({ ...profileData, aadhar: e.target.value })}
          className="my-4 form-control" 
          placeholder="Aadhar Number" 
          />
        </div>
        <div className="col">
        <input 
          type="text" 
          name="bloodGroup" 
          value={bloodGroup}
          onChange={e => setProfileData({ ...profileData, bloodGroup: e.target.value })}
          className="my-4 form-control" 
          placeholder="Blood Group" 
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <select name="gender" value={gender} onChange={(e) => setProfileData({ ...profileData, gender: e.target.value})} className="form-control my-4">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="col">
        <input type="text" name="dob" value={dob} onChange={e => setProfileData({...profileData, dob: e.target.value})} className="my-4 form-control" placeholder="DOB (like dd-mm-yyyy)" />
        </div>
      </div>
      <div className="row">
        <div className="col">
        <input 
          type="number" 
          name="weight" 
          value={weight}
          onChange={e => setProfileData({ ...profileData, weight: e.target.value })}
          className="my-4 form-control" 
          placeholder="Weight" 
          />
        </div>
        <div className="col">
        <input 
          type="number" 
          name="age" 
          value={age}
          onChange={e => setProfileData({ ...profileData, age: e.target.value })}
          className="my-4 form-control" 
          placeholder="Age" 
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
        <input 
          type="text" 
          name="distt" 
          value={distt}
          onChange={e => setProfileData({ ...profileData, distt: e.target.value })}
          className="my-4 form-control" 
          placeholder="Distt" 
          />
        </div>
        <div className="col">
        <input 
          type="text" 
          name="state" 
          value={state}
          onChange={e => setProfileData({ ...profileData, state: e.target.value })}
          className="my-4 form-control" 
          placeholder="State" 
          />
        </div>
      </div>
  <button type="submit" className="my-4 btn btn-outline-danger btn-block">{
    update ? 'Update Profile' : 'Create Profile' 
  }</button>
      </form>
    </section>
  )
}

export default DonorRegister
