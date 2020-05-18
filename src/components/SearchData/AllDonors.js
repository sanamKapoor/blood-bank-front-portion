import React, { useState } from 'react';
import axios from 'axios'; 
import ShowDonors from '../ShowData/ShowDonors';

function AllDonors() {
  const [searchParams, setSearchParams] = useState({
    bloodGroup: '',
    state: '',
    distt: ''
  });

  const [data, setData] = useState([]);

  const { bloodGroup, state, distt } = searchParams;

  const fetchData = donors => {
    
    if(bloodGroup && state && distt){
      setData(donors.filter(d => (d.bloodGroup === bloodGroup && d.distt === distt && d.state === state) ? d : ''))
      return;
    }

    setData('');    
  }

  const handleSubmit = e => {
    e.preventDefault();

    if(bloodGroup && distt && state){

    axios.get("http://localhost:5000/donors")
      .then(res => {
        const { data: { donors } } = res;
        fetchData(donors);
      })
      .catch(err => console.log(err))
    } 
  }
 
  return (
    <>
     <div className="search-area2 text-danger text-center my-4">
   <h1 className="font-weight-bold">Search For Donors</h1>
    <form action="" className="form-inline my-4" onSubmit={e => handleSubmit(e)}>

      <input type="text" onChange={(e) => setSearchParams({ ...searchParams, bloodGroup: e.target.value})} name={bloodGroup} className="form-control" placeholder="Blood Group" id="" />

      <input type="text" onChange={(e) => setSearchParams({ ...searchParams, state: e.target.value})} name={state} className="form-control" placeholder="State" id="" />

      <input type="text" onChange={(e) => setSearchParams({ ...searchParams, distt: e.target.value})} name={distt} className="form-control" placeholder="Distt." id="" />

      <button type="submit" className="btn btn-danger">Search</button>
    </form>
  </div>

  <div className="search-results border border-danger mt-5">
      {
        data.length > 0 
          ?
          data.map(d => <ShowDonors key={d._id} donor={d} />)
          : 
          <h2 className="text-muted text-center">No Result Found</h2>
      }
  </div> 
    </>
  )
}

export default AllDonors
