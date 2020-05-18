import React, { useState, useContext, useEffect } from 'react';
import { MyAuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

function Login() {

  const { dispatch } = useContext(MyAuthContext);

  const history = useHistory();

  const [donor, setDonor] = useState(true);
  let [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })


  const { email, password } = loginData;
  const [err, setErr] = useState('');


  // useEffect(() => {
  //   let errors = sessionStorage.getItem('Error');
  //   setErr(errors)
  // }, [err])

  const handleSubmit = e => {
    e.preventDefault();
    if(email && password){

      if(sessionStorage.getItem('Error')){
        setErr(sessionStorage.getItem('Error'));
        setTimeout(() => {
          setErr('');
        }, 1000)
        sessionStorage.clear();
      } else {
        if(donor){
          dispatch({ type: 'LOGIN_DONOR', payload: loginData});
        } else {
          dispatch({ type: 'LOGIN_BANK', payload: loginData});
        }
      }

      if(!sessionStorage.getItem('Error') && localStorage.getItem('user')){
        alert('You are logged in now!');
        history.push('/');
      }

    } else {
        setErr('Please enter both fields.')
        setTimeout(() => {
          setErr('');
        }, 2000)
    }
  }

  let icon = donor ? 'fas fa-user fa-5x text-danger my-4' : 'fas fa-users fa-5x text-danger my-4';
  return (
    <section>
      <form className="form p-4 border border-danger text-danger text-center" 
      onSubmit={e => handleSubmit(e)} >
        <i className={icon}></i>
        <h5 className="text-danger text-center d-block">Login as a {donor ? 'Donor' : 'Blood Bank'}</h5>
        <span className="text-center text-muted">{err ? err : ''}</span>
        <input 
          type="email" 
          name="email" 
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value})}
          className="my-4 form-control" 
          placeholder="Enter Email" 
        />

        <input 
          type="password" 
          name="password" 
          onChange={e => setLoginData({ ...loginData, password: e.target.value})}
          className="my-4 form-control" 
          placeholder="Enter Password" 
        />

        <button type="submit" className="my-4 btn btn-outline-danger btn-block">Login</button>
        <small className="text-center user-change" onClick={() => setDonor(!donor)}>Change User</small>
      </form>
    </section>
  )
}

export default Login
