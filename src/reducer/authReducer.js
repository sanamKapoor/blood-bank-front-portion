import axios from 'axios';
import setAuthToken from '../utills/setAuthToken';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'LOGIN_DONOR':
      return {
        ...state,
        user: login(action.payload, 'donor')
      }
    case 'LOGIN_BANK':
      return {
        ...state,
        user: login(action.payload, 'bank')
      }
    default: 
      return state
  }
}

const login = (data, type) => {
  axios.post(`http://localhost:5000/auth/${type}-login`, data)
    .then(res => {
      //    Save to localStorage
      const { token, userId } = res.data;
      //     Set token to ls
      localStorage.setItem('jwtToken', token);
      //     Set token to auth header
      setAuthToken(token);
      localStorage.setItem('user', userId);
      return userId;
    })
    .catch(err => {
      console.log(err.response.data.message);
      sessionStorage.setItem('Error', err.response.data.message);
    });
}
