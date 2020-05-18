import React, { useState, useContext, useEffect } from 'react';
import { MyBankContext } from '../../context/BankContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function BankRegister() {

  const {dispatchBank} = useContext(MyBankContext);

  const history = useHistory();

  let [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    type: '',
    description: '',
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
    axios.get(`http://localhost:5000/bank/profile/${id}`, {
      headers: {
        'Authorization': `jwt ${localStorage.getItem('jwtToken')}`
      }
    })
    .then(res => {
      const { data: {bank}} = res;
      setProfileData({
        name: bank.name,
        email: bank.email,
        contact: bank.contact,
        type: bank.type,
        description: bank.description,
        distt: bank.distt,
        state: bank.state
      });
    })
  }

  const { name, email, password, contact, type, description, distt, state } = profileData;

  const handleSubmit = e => {
    e.preventDefault();
    if(name && email && password && contact && description && type && distt && state){
      if(update){
        dispatchBank({ type: 'UPDATE_PROFILE', payload: {
          id: localStorage.getItem('user'),
          data: profileData
        }})
        alert('Profile updated successfully !');
        history.push('/')
      } else {
        dispatchBank({ type: 'REGISTER', payload: profileData})
        alert('Congrats, your profile has been created !')
        history.push('/login')  
      }

      profileData = {
        name: '',
        email: '',
        password: '',
        contact: '',
        type: '',
        description: '',
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
      <i className="fas fa-users fa-5x text-danger my-4"></i>
      <p className="lead d-block">{update ? 'Update' : 'Create'} your Blood Bank Profile</p>
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
          name="contact" 
          value={contact}
          className="my-4 form-control" 
          placeholder="Contact Number"
          onChange={(e) => setProfileData({ ...profileData, contact: e.target.value})}
          />
        </div>
        <div className="col">
        <input 
          type="password" 
          name="password" 
          value={password}
          className="my-4 form-control" 
          placeholder={update ? 'Enter New Password' : 'Password'}
          onChange={e => setProfileData({ ...profileData, password: e.target.value})}
        />
        </div>
      </div>
      <div className="row">
        <div className="col">
        <select name="type" value={type} onChange={e => setProfileData({ ...profileData, type: e.target.value})} className="form-control my-4">
            <option value="">Select Bank Type</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>        
        </div>
        <div className="col">
        <textarea name="description" value={description} onChange={e => setProfileData({ ...profileData, description: e.target.value})} className="my-4 form-control" placeholder="Some Description" id="" cols="10" rows="3"></textarea>
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
      <button type="submit" className="my-4 btn btn-outline-danger btn-block">
        {update ? 'Update Profile' : 'Create Profile'}
      </button>
      </form>
    </section>
  )
}

export default BankRegister
