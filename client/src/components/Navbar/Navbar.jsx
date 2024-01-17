import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  {
    label:"Home",
    path:"/"
  },
  {
    label:"About Us",
    path:"/"
  },
  {
    label:"Contact Us",
    path:"/"
  },
  {
    label:"Reviews",
    path:"/"
  },
]

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed w-100">
      <div className="container-fluid ">
        <Link className="navbar-brand " to="/">
          <strong>HealthConnect</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between " id="navbarNav">
          <ul className="navbar-nav">
           {navItems.map((data,index)=>(
            <li className="nav-item" key={index}>
              <Link className="nav-link active" aria-current="page" to={data.path}>
                {data.label}
              </Link>
            </li>
           )) }
  
          </ul>
          <div className="d-flex gap-3">
            <Link className="btn btn-success" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/register">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
