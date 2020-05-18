import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <React.Fragment>
    

<main>
{/* <div className="stats text-danger font-weight-bold">
  <div className="heading text-center">
  <i className="fas fa-tint fa-8x text-danger"></i>
  <h1 className="stats-heading  text-danger font-weight-bold">
    Every Blood Donor is a life saver !!
  </h1>
</div>

  
</div> */}
</main>

<article>
<Link to="/banks" className="blood-bank-filter text-danger">
  <i className="fas fa-search fa-5x"></i>
  <h4 className="mt-4">Search Blood Bank</h4>
</Link>
<Link to="/donors" className="donor-filter text-danger">
  <i className="fas fa-search fa-5x"></i>
  <h4 className="mt-4">Search for Donors</h4>
</Link>
</article>

<div className="my-5">
<div className="row w-75 mx-auto">
  <div className="col-5 my-3">
    <img src="https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2019/11/13/file70kc18dlox411gg69752-1573590602.jpg?itok=VWqG126L" className="img-fluid" alt="" />
  </div>
  <div className="col-7 my-3 align-self-center">
    <p>
      Our nation requires 4 Crore Units of Blood while only 40 lakh units are available,
      Every two seconds someone needs Blood.
      There is no substitute for Human Blood. It cannot be manufactured.
      Blood donation is an extremely noble deed, yet there is a scarcity of regular donors across India.
      We focus on creating & expanding a virtual army of blood donating volunteers who could be searched and contacted by family / care givers of a patient in times of need.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae maiores incidunt tenetur tempora possimus architecto sed non minima, velit necessitatibus sequi reprehenderit voluptates fugiat dolor est quidem sunt animi quaerat. Voluptas dolore, omnis hic quisquam odit odio velit expedita non corporis eveniet ullam itaque possimus dolor repudiandae magnam sapiente quibusdam!
    </p>
  </div>
</div>
</div>

<footer>
<div className="about">
  <h2 className="font-weight-bold">About</h2>
  <p className="w-75">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laudantium, delectus hic nam explicabo beatae labore odit consectetur dolore qui, recusandae, sunt neque repellendus. Iusto ab voluptate mollitia obcaecati alias. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat aliquam alias tempore, nobis corrupti, quae sed quos temporibus fuga cupiditate nesciunt doloremque asperiores quibusdam aspernatur pariatur. Deleniti culpa excepturi quia?</p>
</div>
</footer> 
    </React.Fragment>
  )
}

export default Landing
