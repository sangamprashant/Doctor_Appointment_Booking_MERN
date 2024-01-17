import React from "react";
import HeroCss from "./Hero.module.css";
import { HomeIcon } from "../../assets";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className={HeroCss.mainContainer}>
      <section className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 ">
              <div className=" ">
                <h1 className="display-4">Welcome to HealthConnect</h1>
                <p className="lead">
                  Your one-stop platform for managing health appointments and
                  services. Explore a variety of features, from booking
                  appointments as a user to registering and applying as a doctor
                  to serve your community.
                </p>
                <Link
                  to="/register"
                  className="btn btn-outline-secondary btn-lg"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-center flex-grow-1">
              <img
                src={HomeIcon}
                height="400"
                width="400"
                alt="Hero Image"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
