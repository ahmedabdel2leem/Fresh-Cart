import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
export default function AuthLayout() {
  let navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate('/home');
    }
  })
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/"><img src={logo} alt="" /></NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/signin">Log In</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/forgotpassword">Forget Password</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div className="container">
      <Outlet/>
      </div>
    </>
  )
}
