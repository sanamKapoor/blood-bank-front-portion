import React, { useState, useEffect } from 'react'
import axios from 'axios';

function AllPosts({ user }) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchAllPosts();
  }, [])

  const fetchAllPosts = () => {
    axios.get("http://localhost:5000/post/all")
      .then(res => {
        const { data: {posts} } = res;
        setPosts(posts);
        
      })
      .catch(err => console.log(err))
  }

  const handleRegistration = (id) => {
    let userId = localStorage.getItem('user');

    if(user === 'Donor'){
      axios.post(`http://localhost:5000/register/${id}/${userId}`, {
        headers: {
          'Authorization': `jwt ${localStorage.getItem('jwtToken')}`
        }
      })
      .then(res => {
        const { data: {message}} = res;
        console.log(message);
        alert('Congrats you have registered!')
      })
      .catch(err => console.log(err))
    } else {
      alert('Only Donor can register!')
    }
    
  }


  const ShowUI = postArr => {
    let post = postArr.post;
    let id = post._id;

      if(post){
      return(
        <div style={{borderRadius: "10px"}} className="my-4 p-3 container w-50 mx-auto bg-light border border-secondary shadow">
              <h4 className="col-12">{post.title}</h4>
              <p className="mt-3 p-2 border border-secondary" style={{borderRadius: "5px"}}>{post.content}</p>
              <div className="row">
                  {
                  post.creator.name ? 
                  <div className="col" >Organised by : {post.creator.name}</div>
                   : ''
                   }
                  {
                  post.donors.length > 0 ? 
                  <div className="col text-right align-items-center">Registered Donors : {post.donors.length}</div>
                   : ''
                   }
              </div>
              <div className="row my-2">
              <div className="col">
                <span className="text-muted align-self-center">Uploaded at : {new Date(post.updatedAt).toDateString()}</span>
                </div>
                <div className="col text-right">
                  <button className="btn btn-secondary" onClick={() => handleRegistration(id)}>
                    Register
                  </button>
                </div>
              </div>
            </div>
      )}
  }


  return (
    <div>
      {
        (posts && posts.length > 0)
        ?
        posts.map(post => post ? <ShowUI key={post._id} post={post} /> : '' )
        :
        <h2 className="text-center text-muted mt-4">No Events for Now.</h2>
      }
    </div>
  )
}

export default AllPosts
