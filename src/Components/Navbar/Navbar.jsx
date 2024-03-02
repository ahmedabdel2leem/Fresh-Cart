import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import frechCartLogo from "../../assets/images/freshcart-logo.svg";
import "./Navbar.css";

import { WishListContext } from "../../Context/WishListCOntext";
import { cartCounterContext } from './../../Context/cartCounterContext';

export default function Navbar() {
  let { cartCount } = useContext(cartCounterContext);
  let { wishCount } = useContext(WishListContext);

  function deleteToken() {
    localStorage.removeItem("token");
  }
  const [scroll, setScroll] = useState(false);
console.log(window.scrollY)
useEffect(() => {
  window.addEventListener("scroll", () => {
    setScroll(window.scrollY > 1);
  });
},[window.scrollY]);
  return (
    <>
      <nav className={`navbar  navbar-expand-lg bg-body-tertiary  ${scroll ? "fixed-top" : ""}`}>
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src={frechCartLogo} alt="Logo" />
          </NavLink>
          <div className="smallNav d-lg-none d-flex">
            <ul className=" list-unstyled  d-flex align-items-center mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="position-relative me-1" to={"/wishlist"}>
                  {wishCount ? (
                    <span
                      style={{
                        fontSize: ".548rem",
                        lineHeight: "normal",
                        top: "-5px",
                      }}
                      className="position-absolute  start-100 translate-middle  badge rounded-circle bg-danger"
                    >
                      {wishCount}
                    </span>
                  ) : (
                    ""
                  )}
                  <i
                    className="fa-regular fa-heart fs-4  cursor-pointer"
                    aria-hidden="true"
                  ></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="position-relative mx-2" to={"/cart"}>
                  {cartCount ? (
                    <span
                      style={{
                        fontSize: ".548rem",
                        lineHeight: "normal",
                        top: "-5px",
                      }}
                      className="position-absolute  start-100 translate-middle  badge rounded-circle bg-danger"
                    >
                      {cartCount}
                    </span>
                  ) : (
                    ""
                  )}
                  <i
                    className="fa fa-shopping-cart fs-4 text-main"
                    aria-hidden="true"
                  ></i>
                </NavLink>
              </li>
            </ul>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/brands">
                  Brands
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link" to={"/allorders"}>
                  All Orders
                </NavLink>
              </li>
              <ul className="dropdown-menu d-inline-block d-lg-none">
                <li className="">
                  <NavLink className='dropdown-item'  to={"/updatepass"}>
                    Change Password
                  </NavLink>
                </li>
                <li className="">
                  <NavLink className='dropdown-item' to={"/updatedata"}>
                    Update Data
                  </NavLink>
                </li>
                <li className="">
                  <NavLink className='dropdown-item' onClick={deleteToken} to={"/signin"}>
                    Logout
                  </NavLink>
                </li>
              </ul>
            </ul>

                {/* dropdown */}
                <div className="dropdown-center w-auto d-none d-lg-flex">
            <button className="btn border-0 mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa-regular fa-user fs-4 "></i>
            </button>
             
              <ul className="dropdown-menu">
                <li className="">
                  <NavLink className='dropdown-item'  to={"/updatepass"}>
                    Change Password
                  </NavLink>
                </li>
                <li className="">
                  <NavLink className='dropdown-item' to={"/updatedata"}>
                    Update Data
                  </NavLink>
                </li>
                <li className="">
                  <NavLink className='dropdown-item' onClick={deleteToken} to={"/signin"}>
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
            <ul className="navbar-nav d-none d-lg-flex  mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="position-relative me-1" to={"/wishlist"}>
                  {wishCount ? (
                    <span
                      style={{
                        fontSize: ".548rem",
                        lineHeight: "normal",
                        top: "-5px",
                      }}
                      className="position-absolute  start-100 translate-middle  badge rounded-circle bg-danger"
                    >
                      {wishCount}
                    </span>
                  ) : (
                    ""
                  )}
                  <i
                    className="fa-regular fa-heart fs-4  cursor-pointer"
                    aria-hidden="true"
                  ></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="position-relative mx-2" to={"/cart"}>
                  {cartCount ? (
                    <span
                      style={{
                        fontSize: ".548rem",
                        lineHeight: "normal",
                        top: "-5px",
                      }}
                      className="position-absolute  start-100 translate-middle  badge rounded-circle bg-danger"
                    >
                      {cartCount}
                    </span>
                  ) : (
                    ""
                  )}
                  <i
                    className="fa fa-shopping-cart fs-4 text-main"
                    aria-hidden="true"
                  ></i>
                </NavLink>
              </li>
            </ul>



        
          </div>
        </div>
      </nav>
    </>
  );
}
