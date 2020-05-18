import React from 'react';
import { Link } from 'react-router-dom';

function Register() {

  return (
    <section>
    <Link to="/bank-register" className="text-center register-users border border-danger text-danger text-center py-4">
      <i className="fas fa-users fa-5x text-danger my-4"></i>
      <h4>Register as Blood Bank</h4>
    </Link>
    <Link to="/donor-register" className="text-center register-users border border-danger text-danger text-center py-4">
      <i className="fas fa-user fa-5x text-danger my-4"></i>
      <h4>Register as Donor</h4>
    </Link>
  </section>
  )
}

export default Register
