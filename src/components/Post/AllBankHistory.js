import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AllBankHistory({user}) {

  const [currentUser, setCurrentUser] = useState('');
  const [registerUser, setRegisterUser] = useState([]);
  const [confirmedUser, setConfirmedUser] = useState([]);
  let [showR, setShowR] = useState({
    post: '',
    show: false
  });
  let [showC, setShowC] = useState({
    post: '',
    show: false
  });

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
        setCurrentUser(data.donor)
      } else {
        setCurrentUser(data.bank)
      }
    })
  }

  const getRegisteredUsers = donors => {
      setRegisterUser([])
      donors.map(d => {
        axios.get(`http://localhost:5000/donor/profile/${d.donor}`, {
          headers: {
            'Authorization': `jwt ${localStorage.getItem('jwtToken')}`
          }
        })
        .then(res => {
          const { data : { donor } } = res;
          setRegisterUser(registerUser => [ ...registerUser, donor])
        }).catch(err => console.log(err))      
      })
   
  }

  const getConfirmedUsers = confirmed => {
    // if(confirmed.length > 0 && fetchOnce){
      setConfirmedUser([])
      confirmed.map(d => {
        axios.get(`http://localhost:5000/donor/profile/${d.donor}`, {
          headers: {
            'Authorization': `jwt ${localStorage.getItem('jwtToken')}`
          }
        })
        .then(res => {
          const { data : { donor } } = res;
          setConfirmedUser(confirmedUser => [ ...confirmedUser, donor])
        }).catch(err => console.log(err))      
      })
    // }  
  }

  const deletePost = id => {
    axios.delete(`http://localhost:5000/post/${id}`, {
      headers: {
        'Authorization': `jwt ${localStorage.getItem('jwtToken')}`
      }
    })
      .then(res => {
        const {data: {message}} = res;
        console.log(message);
      })
      .catch(err => console.log(err))

  }

  const addToConfirmeList = (postId, userId) => {
    console.log(postId, userId);
    axios.post(`http://localhost:5000/register/confirmed/${postId}/${userId}`)
      .then(res => {
        console.log(res.data.message);
      })
      .catch(err => console.log(err))
  }

  const removeFromConfirmed = (postId, userId) => {
    axios.delete(`http://localhost:5000/register/confirmed/${postId}/${userId}`)
      .then(res => {
        console.log(res.data.message);
      })
      .catch(err => console.log(err))
  }

  const RegisterUserLayout = ({postId, users}) => {
    let btntext;
    if(users === registerUser){
      btntext = 'Add to Confirmed Users'
    } else {
      btntext = 'Remove from Confirmed Users'
    }
    let ui = users.map(user => {
      return(
      <div key={user._id} className="p-3 border border-secondary text-muted mt-3" style={{borderRadius: "5px"}}>
        <div className="row">
          <span className="col text-capitalize text-secondary">{user.name}</span>
          <span className="col">Blood Group : {user.bloodGroup}</span>
        </div>
        <div className="row">
          <span className="col">Weight : {user.weight}</span>
          <span className="col">Age : {user.age}</span>
        </div>
        <div className="row">
          <span className="col ">Mobile : {user.mobile}</span>
          <span className="col">Email : {user.email}</span>
        </div>
        <div className="row">
          <span className="col text-capitalize">Distt. : {user.distt}</span>
          <span className="col text-capitalize">State : {user.state}</span>
        </div>
        <button 
          className="btn btn-sm btn-block btn-secondary mt-2"
          onClick={() => users === registerUser ? addToConfirmeList(postId, user._id) : removeFromConfirmed(postId, user._id)}
          >
            {btntext}
          </button>
    </div>
      )
    })
    return ui;
  }

  const BankUI = () => {
    if(currentUser.posts.length > 0){
      let data = currentUser.posts.map(post => {
        
        return(
          <div key={post._id} style={{borderRadius: "10px"}} className="my-5 p-3 container w-50 mx-auto bg-light border border-secondary shadow">
            <div className="row">
            <h4 className="col">{post.title}</h4>
            <span className="col text-muted text-right align-self-center">Created at : {new Date(post.updatedAt).toDateString()}</span>
            </div>
            <p className="mt-3 p-2 border border-secondary" style={{borderRadius: "5px"}}>{post.content}</p>
            <div className="row">
            <div className="col-7">

              <button
              className="btn btn-info" 
              onClick={() => {
                setShowR({
                  post: post._id,
                  show: !showR.show
                })
                setShowC({
                  post: '',
                  show: false
                })
                getRegisteredUsers(post.donors)
              }}>
                Registed User ({post.donors.length})
                </button>

              <button 
              className="btn ml-1 btn-info" 
              onClick={() => {
                setShowR({
                  post: '',
                  show: false
                })
                setShowC({
                  post: post._id,
                  show: !showC.show
                })
                getConfirmedUsers(post.confirmed)
              }
              }>
                Confirmed User ({post.confirmed.length})
              </button>

            </div>
            <div className="col-5 text-right">
              <Link to={{
                pathname: "/create-post",
                state: { id: post._id, update: true, currentPost: post }
              }} className="btn mx-1 btn-secondary" >
                Edit Post
                </Link>
              <button className="btn mx-1 btn-danger" onClick={() => deletePost(post._id)}>Delete Post</button>
            </div>
            </div>

            {/* Show Users */}

              {
              (registerUser.length > 0 && showR.show && (showR.post === post._id)) ?
              <RegisterUserLayout users={registerUser} postId={post._id} />
             :
             ''
              }

              {
              (confirmedUser.length > 0 && showC.show && (showC.post === post._id)) ?
              <RegisterUserLayout users={confirmedUser} postId={post._id} />
              :
              ''
              }
                        

          </div>
        )
      })

      return data;
    }
  }


  return (
    <div>
      {
        (currentUser && user === 'Bank' && currentUser.posts.length > 0) 
        ? 
        <BankUI /> 
        : 
        <h2 className="text-center text-muted mt-4">No History</h2>
      }
    </div>
  )
}

export default AllBankHistory
