import axios from 'axios';


const postProfile = (data) => {
  axios.post('http://localhost:5000/donor/profile', data)
          .then(res => {
            const { data: { message, userId}} = res;
            console.log(message);
            return userId
          })
          .catch(err => console.log(err))
}

const updateProfile = ({id, data}) => {
  axios.put(`http://localhost:5000/donor/profile/${id}`, data)
          .then(res => {
            const { data: { message, userId}} = res;
            console.log(message);
            return userId
          })
          .catch(err => console.log(err))
}

export default (state, action) => {
    switch(action.type){
      case 'REGISTER':
        return {
            ...state,
            donor: postProfile(action.payload)
          }
      case 'UPDATE_PROFILE': 
          return{
            ...state,
            donor: updateProfile(action.payload)
          }
      default:
        return state
    }
}
