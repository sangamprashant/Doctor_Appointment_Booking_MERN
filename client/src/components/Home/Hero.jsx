import React from "react";
import HeroCss from "./Hero.module.css";

function Hero() {
  return (
    <div className={HeroCss.mainContainer}>
      <section class="hero">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="hero-content">
                <h1 class="display-4">Welcome to BOOTSTRAPFINDS</h1>
                <p class="lead">
                  Discover a wide range of pre-made Bootstrap components and
                  code snippets at BOOTSTRAPFINDS. Streamline your web
                  development with our collection of ready-to-use, responsive
                  design elements.
                </p>
                <a href="#" class="btn btn-outline-secondary btn-lg">
                  Get Started
                </a>
              </div>
            </div>
            <div class="col-lg-6 d-flex justify-content-center">
              <img
                src="https://www.bootstrapfinds.tech/logo.png"
                height="400"
                width="400"
                alt="Hero Image"
                class="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
