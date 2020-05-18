import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import setAuthToken from './utills/setAuthToken';

import Header from './components/Header';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import AllBloodBanks from './components/SearchData/AllBloodBanks';
import AllDonors from './components/SearchData/AllDonors';
import BankRegister from './components/createProfile/BankRegister';
import DonorRegister from './components/createProfile/DonorRegister';
import BankContext from './context/BankContext';
import DonorContext from './context/DonorContext';
import AuthContext from './context/AuthContext';
import ShowProfile from './components/ShowProfile';
import CreatePost from './components/Post/CreatePost';
import AllPosts from './components/Post/AllPosts';
import AllDonorHistory from './components/Post/AllDonorHistory';
import AllBankHistory from './components/Post/AllBankHistory';

function App() {


  const [user, setUser] = useState('');

  useEffect(() => {
    if(localStorage.getItem('user')){
      fetchData(localStorage.getItem('user'))
    }

    return () => {
      setTimeout(() => {
        localStorage.clear();
        setAuthToken(false);
        setUser('')
      }, (60 * 60000))
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


  return (
    <Router>
     <Header />
     <Route path="/register" component={Register} />
     
     <AuthContext>
        <Route path="/login" component={Login} />
     </AuthContext>

      <BankContext>
        <Route path="/bank-register" component={BankRegister} />
        <Route path="/create-post" component={CreatePost} />
      </BankContext>

      <Route path="/profile"> 
        <ShowProfile user={user} />
      </Route>
      

      <Route path="/donor-history"> 
        <AllDonorHistory user={user} />
      </Route>

      <Route path="/bank-history"> 
        <AllBankHistory user={user} />
      </Route>

      <DonorContext>
        <Route path="/donor-register" component={DonorRegister} /> 
      </DonorContext>

      <Route path="/events"> 
        <AllPosts user={user} />
      </Route>

      <Route path="/banks" component={AllBloodBanks} />
      <Route path="/donors" component={AllDonors} />
      <Route  exact path="/" component={Landing} />
    </Router>
  );
}

export default App;
