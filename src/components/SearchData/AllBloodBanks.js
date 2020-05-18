import React, { useState } from 'react';
import axios from 'axios';
import ShowBanks from '../ShowData/ShowBanks';

function AllBloodBanks() {
  const [searchParams, setSearchParams] = useState({
    state: '',
    distt: ''
  });

  const [data, setData] = useState([]);

  const { state, distt } = searchParams;

  const fetchData = donors => {
    
    if(state && distt){
      setData(donors.filter(d => (d.distt === distt && d.state === state) ? d : ''))
      return;
    }

    setData('');    
  }

  const handleSubmit = e => {
    e.preventDefault();

    if(distt && state){

    axios.get("http://localhost:5000/banks")
      .then(res => {
        const { data: { banks } } = res;
        fetchData(banks);
      })
      .catch(err => console.log(err))
    } 
  }
 
  return (
    <>
     <div className="search-area text-danger text-center my-4">
   <h1 className="font-weight-bold">Search Blood Bank</h1>
    <form action="" className="form-inline my-4" onSubmit={e => handleSubmit(e)}>

      <input type="text" onChange={(e) => setSearchParams({ ...searchParams, state: e.target.value})} name={state} className="form-control" placeholder="State" id="" />

      <input type="text" onChange={(e) => setSearchParams({ ...searchParams, distt: e.target.value})} name={distt} className="form-control" placeholder="Distt." id="" />

      <button type="submit" className="btn btn-danger">Search</button>
    </form>
  </div>

  <div className="search-results border border-danger mt-5">
      {
        data.length > 0 
          ?
          data.map(d => <ShowBanks key={d._id} bank={d} />)
          : 
          <h2 className="text-muted text-center">No Result Found</h2>
      }  </div> 
    </>
  )
}

export default AllBloodBanks
