import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      // name:name.trim(),
      email:email.trim(),
      password:password.trim(),
    };

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_API + "/api/user/login", reqBody);

      console.log("Login successful:", response.data);

      // You can redirect the user or perform other actions after successful login
    } catch (error) {
      console.error("Login failed:", error.response.data);

      // Handle login failure, show error messages, etc.
    }
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3">Welcome to BOOTSTRAPFINDS</h1>
          <p className="col-lg-10 fs-4">
            Discover a wide range of pre-made Bootstrap components and code
            snippets at BOOTSTRAPFINDS. Streamline your web development with our
            collection of ready-to-use, responsive design elements.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form onSubmit={handleSubmit} className="p-4 p-md-5 border rounded-3 bg_light">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Log in
            </button>
            <hr className="my-4" />
            <small className="text-muted">
              By clicking Log in, you agree to the terms of use.
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
