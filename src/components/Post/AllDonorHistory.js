import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';


function AllDonorHistory({ user }) {
  const [currentUser, setCurrentUser] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [donorHistory, setDonorHistory] = useState([])

  useEffect(() => {
    getProfile(user)
    getAllPosts(allPosts)
  })


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
        setCurrentUser(data.donor)
      } else {
        setCurrentUser(data.bank)
      }
    })
  }

  function getAllPosts(allPosts){
    let userId = localStorage.getItem('user');

    axios.get('http://localhost:5000/post/all')
      .then(res => {
          const { data: { posts }} = res;
          setAllPosts(posts);
        })
      .catch(err => console.log(err))

      if(allPosts.length > 0){
        allPosts.map(post => {
          let confirmedDonors = post.confirmed;

          if(confirmedDonors.length > 0){
            confirmedDonors.map(confD => {
              if(confD.donor === userId){
                let bank = post.creator;
                setDonorHistory(donorHistory => [ ...donorHistory, bank])
                
              }
            })
          }
        })
      }

      // console.log(allPosts, donorHistory);
    }


    const DonorUI = () => {
    
      if(donorHistory.length > 0){
        let bank = donorHistory.pop();
        return (
          <div className="row bg-light w-50 mx-auto p-3 my-3">
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
        
      } else {
        return <h4>No History</h4>
      }
         
    }
  
  return (
    <div>

      {
        (currentUser && user === 'Donor' && donorHistory.length > 0)
          ?
          donorHistory.map(donor => <DonorUI />)
          :
          <h2 className="text-center text-muted">No History</h2>
      }
    </div>
  
  )
    }

export default AllDonorHistory
