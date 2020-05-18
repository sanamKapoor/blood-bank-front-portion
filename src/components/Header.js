import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import setAuthToken from '../utills/setAuthToken';
import axios from 'axios';

function Header() {

  const history = useHistory();

  const [nav, setNav] = useState('');
  const [user, setUser] = useState('');

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setAuthToken(false);
    history.push('/');
  }

  useEffect(() => {
    if(localStorage.getItem('user')){
      fetchData(localStorage.getItem('user'))
      navBar(user)
    }
  }, [user])

  const fetchData = (userId) => {
    
    axios.get('http://localhost:5000/donors')
      .then(res => {
        const { data: { donors }} = res;
        donors.filter(d => {
          if(d._id === userId){
            setUser('Donor')
          }
        })
      })
      .catch(err => console.log(err))

    axios.get('http://localhost:5000/banks')
      .then(res => {
        const { data: { banks }} = res;
        banks.filter(b => {
          if(b._id === userId){
            setUser('Bank')
          }
        })
      })
      .catch(err => console.log(err))
  }


  const navBar = (user) => {
    if(user ==='Donor'){
      setNav(
        <ul className="navbar-nav ml-auto ">
        <li className="nav-item mr-3">
          <Link className="nav-link text-light" to="/events">Events</Link>
        </li>
        <li className="nav-item mr-3">
          <Link className="nav-link text-light" to="/donor-history">History</Link>
        </li>
        <li className="nav-item mr-3">
          <Link className="nav-link text-light" to="/profile">Profile</Link>
        </li>
        <li className="nav-item mr-3">
          <button type="button" onClick={logout} className="btn btn-outline-light">Logout</button>
        </li>
      </ul>
      )
    } else if(user === 'Bank'){
      setNav(
        <ul className="navbar-nav ml-auto ">
        <li className="nav-item mr-3">
          <Link className="nav-link text-light" to="/create-post">Create Post</Link>
        </li>
        <li className="nav-item mr-3">
          <Link className="nav-link text-light" to="/bank-history">History</Link>
        </li>
        <li className="nav-item mr-3">
          <Link className="nav-link text-light" to="/profile">Profile</Link>
        </li>
        <li className="nav-item mr-3">
        <button type="button" onClick={logout} className="btn btn-outline-light">Logout</button>
        </li>
      </ul>
      )
    } else {
      setNav('')
    }
  }
  return (
    <header className="container-fluid bg-danger">

    <nav className="navbar navbar-expand-lg navbar-dark ">
      <Link to="/" className="navbar-brand">AIBBMS</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {
          nav ? nav : 
          <ul className="navbar-nav ml-auto ">
          
          <li className="nav-item mr-3">
            <Link className="nav-link text-light" to="/login">Login</Link>
          </li>
          <li className="nav-item mr-3">
            <Link className="nav-link text-light" to="/register">Register</Link>
          </li>
          
        </ul>
        }
      </div>
    </nav>
    </header>
  )
}

export default Header
