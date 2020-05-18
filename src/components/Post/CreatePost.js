import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function CreatePost(props) {

  const history = useHistory();

  const [post, setPost] = useState({
    title: '',
    content: '',
  }) 

  const [myprops, setProps] = useState({
    update: false,
    id: '',
  })

  useEffect(() => {
    if(props.location.state){
      const {update, id, currentPost } = props.location.state;

      setProps({
        update: update,
        id: id,
      })
      setPost({
        title: currentPost.title,
        content: currentPost.content
      })
    }
  }, [])
  

  const { title, content } = post;

  const handleSubmit = e => {
    e.preventDefault();

    if(title && content){
      if(myprops.update){
        axios({
          url: `http://localhost:5000/post/${myprops.id}`,
          method: "PUT",
          data: post,
          headers: {
              'Authorization': `jwt ${localStorage.getItem('jwtToken')}`
            } 
        })
          .then(res => {
            const { data: { message}} = res;
            console.log(message);
             history.push('/bank-history');
          })
          .catch(err => console.log(err))

          alert('Your Post has Updated.')
          setPost('');
      } else {
        axios({
          url: "http://localhost:5000/post",
          method: "POST",
          data: post,
          headers: {
              'Authorization': `jwt ${localStorage.getItem('jwtToken')}`
            } 
        })
          .then(res => {
            const { data: { message}} = res;
            console.log(message);
            history.push('/history');
          })
          .catch(err => console.log(err))

          alert('You have created a Post.')
          setPost('');
      }
    } else {
      alert('Please enter both Title and Description.')
    }
    
  }

  
  return (
    <div className="border border-secondary mt-4 w-50 mx-auto p-4" style={{borderRadius: "15px"}}>
      <h3 className="text-center">{ myprops.update ? 'Update' : 'Create'} Post</h3>
      <form className="form" onSubmit={e => handleSubmit(e)} >
        <input 
          type="text" 
          name="title" 
          value={post.title}
          className="form-control my-4" 
          placeholder="Title" 
          onChange={e => setPost({...post, title: e.target.value})}
          />
       
        <textarea 
          name="description" 
          value={post.content}
          placeholder="Some Description" 
          className="form-control my-4" 
          onChange={e => setPost({...post, content: e.target.value})}
          cols="10" 
          rows="5">
          </textarea>
        <button type="submit" className="my-4 btn btn-block btn-secondary">{ myprops.update ? 'Update' : 'Create'} Post</button>
      </form>
    </div>
  )
}

export default CreatePost
